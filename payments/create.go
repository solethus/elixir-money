package payments

import (
	"context"
	"database/sql"
	"errors"

	"encore.app/users"
	"encore.app/wallets"
	"encore.dev/beta/errs"
)

type SendParams struct {
	ReceiverPhoneNo string  `json:"target_phone_no"`
	SenderPhoneNo   string  `json:"sender_phone_no"`
	AmountUSDC      float64 `json:"amount_usdc"`
}

type SendResponse struct {
	SenderBalance   float64 `json:"sender_balance"`
	ReceiverBalance float64 `json:"receiver_balance"`
}

//encore:api public
func (s *Service) Send(ctx context.Context, p *SendParams) (*SendResponse, error) {
	if p.AmountUSDC <= 0 {
		return nil, &errs.Error{Code: errs.InvalidArgument, Message: "amount must be greater than 0"}
	}

	senderLookupParams := &users.LookupByPhoneNoParams{UserPhoneNo: p.SenderPhoneNo}

	senderResponse, err := users.LookupByPhoneNo(ctx, senderLookupParams)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for sender phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up sender")
	}

	receiverLookupParams := &users.LookupByPhoneNoParams{UserPhoneNo: p.ReceiverPhoneNo}
	receiverResponse, err := users.LookupByPhoneNo(ctx, receiverLookupParams)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for receiver phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up receiver")
	}

	res, err := wallets.UpdateWalletBalances(ctx, &wallets.UpdateWalletBalancesParams{
		SenderUserID:   senderResponse.User.ID,
		ReceiverUserID: receiverResponse.User.ID,
		USDCAmount:     p.AmountUSDC,
	})
	if err != nil {
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error moving money between wallets")
	}

	return &SendResponse{
		SenderBalance:   res.SenderBalance,
		ReceiverBalance: res.ReceiverBalance,
	}, nil
}
