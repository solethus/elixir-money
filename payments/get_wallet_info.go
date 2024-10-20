package payments

import (
	"context"

	"encore.app/users"
	"encore.app/wallets"
)

type WalletResponse struct {
	// Currency of the logged-in user
	Currency string `json:"currency"`
	// Balance of the logged-in user
	Balance string `json:"balance"`
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
		return nil, err
	}

	walletBal, err := wallets.GetBalance(ctx, user.User.ID)
	if err != nil {
		return nil, err
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
