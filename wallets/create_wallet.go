package wallets

import (
	"context"

	"encore.app/wallets/store/storegen"
	"github.com/gagliardetto/solana-go"
)

type CreateWalletResponse struct {
	WalletID          int32  `json:"wallet_id"`
	UsdcWalletAddress string `json:"usdc_wallet_address"`
}

// CreateWallet creates a wallet
//
//encore:api method=POST path=/wallets/create
func (s *Service) CreateWallet(ctx context.Context) (*CreateWalletResponse, error) {
	// Create a new account:
	account := solana.NewWallet()

	args := storegen.InsertIntoWalletsParams{
		UsdcWalletAddress:   account.PublicKey().String(),
		UsdcWalletAddressPk: account.PrivateKey.String(),
		UsdcBalance:         10,
	}

	walletID, err := s.repo.InsertIntoWallets(ctx, args)
	if err != nil {
		return nil, err
	}

	return &CreateWalletResponse{
		WalletID:          walletID,
		UsdcWalletAddress: account.PublicKey().String(),
	}, nil
}
