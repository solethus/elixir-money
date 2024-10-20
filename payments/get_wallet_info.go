package payments

import (
	"context"
	"database/sql"
	"errors"

	"encore.app/users"
	"encore.app/wallets"
	"encore.dev/beta/errs"
)

type WalletResponse struct {
	// Currency of the logged-in user
	Currency string `json:"currency"`
	// Balance of the logged-in user
	Balance float64 `json:"balance"`
}

// GetWallet returns the wallet information
//
//encore:api public method=POST path=/payments/balance/:phoneNumber
func (s *Service) GetWallet(ctx context.Context, phoneNumber string) (*WalletResponse, error) {
	args := users.LookupByPhoneNoParams{
		UserPhoneNo: phoneNumber,
	}
	user, err := users.LookupByPhoneNo(ctx, &args)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up user")
	}

	walletBal, err := wallets.GetBalance(ctx, user.User.ID)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "balance not found for user ID.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up user")
	}

	argsQuote := QuoteParams{
		CurrencyCode:       "USD",
		Amount:             walletBal.Balance,
		TargetCurrencyCode: user.User.FiatWalletCurrency,
	}
	quote, err := s.Quote(ctx, &argsQuote)
	if err != nil {
		return nil, err
	}

	return &WalletResponse{
		Currency: user.User.FiatWalletCurrency,
		Balance:  quote.SecondaryCurrencyQuote,
	}, nil
}
