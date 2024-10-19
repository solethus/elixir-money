package wallets

import (
	"context"
)

type WalletResponse struct {
	Balance float64 `json:"balance"`
}

// GetBalance returns the balance in the users wallet
//
//encore:api method=POST path=/wallets/balance/:userID
func (s *Service) GetBalance(ctx context.Context, userID int32) (*WalletResponse, error) {
	walletBal, err := s.repo.LookupWalletBalance(ctx, userID)
	if err != nil {
		return nil, err
	}

	return &WalletResponse{
		Balance: walletBal,
	}, nil
}
