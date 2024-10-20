package wallets

import (
	"context"

	"encore.app/wallets/store/storegen"
	"encore.dev/beta/errs"
)

type UpdateWalletBalancesParams struct {
	SenderUserID   int32   `json:"sender_user_id"`
	ReceiverUserID int32   `json:"receiver_user_id"`
	USDCAmount     float64 `json:"usdc_amount"`
}

type UpdateWalletBalancesResponse struct {
	SenderBalance   float64 `json:"sender_balance"`
	ReceiverBalance float64 `json:"receiver_balance"`
}

// UpdateWalletBalances makes a transfer between wallets, but only commits once confirmed it can happen.
//
//encore:api private path=/wallets/update-balance
func (s *Service) UpdateWalletBalances(ctx context.Context, p *UpdateWalletBalancesParams) (*UpdateWalletBalancesResponse, error) {
	if p.SenderUserID == p.ReceiverUserID {
		return nil, &errs.Error{Code: errs.InvalidArgument, Message: "sender cannot be the same as receiver"}
	}

	tx, err := s.db.Begin()
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "starting transaction")
	}
	defer func() { _ = tx.Rollback() }()

	queries := storegen.Queries{}
	qtx := queries.WithTx(tx)

	senderWallet, err := qtx.LookupWallet(ctx, p.SenderUserID)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "looking up sender balance")
	}

	if senderWallet.UsdcBalance < p.USDCAmount {
		return nil, &errs.Error{Code: errs.InvalidArgument, Message: "sender does not have sufficient balance"}
	}

	// Just check receiver wallet exists, before proceeding
	_, err = qtx.LookupWallet(ctx, p.ReceiverUserID)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "looking up receiver wallet")
	}

	updateSenderParams := storegen.UpdateWalletBalanceParams{
		UsdcBalance: -p.USDCAmount, // Remove amount from sender's account
		UserID:      p.SenderUserID,
	}

	err = qtx.UpdateWalletBalance(ctx, updateSenderParams)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "updating sender wallet")
	}

	updateReceiverParams := storegen.UpdateWalletBalanceParams{
		UsdcBalance: p.USDCAmount,
		UserID:      p.ReceiverUserID,
	}

	err = qtx.UpdateWalletBalance(ctx, updateReceiverParams)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "looking up receiver wallet")
	}

	err = tx.Commit()
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error committing transaction")
	}

	senderBalance, err := s.repo.LookupWalletBalance(ctx, p.SenderUserID)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up sender balance")
	}

	receiverBalance, err := s.repo.LookupWalletBalance(ctx, p.ReceiverUserID)
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up receiver balance")
	}

	return &UpdateWalletBalancesResponse{
		SenderBalance:   senderBalance,
		ReceiverBalance: receiverBalance,
	}, nil
}
