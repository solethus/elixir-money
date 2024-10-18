package wallets

import (
	"context"

	"encore.app/users"
	"encore.app/wallets/store/storegen"
	"encore.dev/pubsub"
)

type AssignWalletResponse struct {
	WalletID          int32  `json:"wallet_id"`
	UsdcWalletAddress string `json:"usdc_wallet_address"`
}

// AssignWallet creates a wallet
//
//encore:api method=POST path=/wallets/assign
func (s *Service) AssignWallet(ctx context.Context, event *users.RequestWalletEvent) error {
	walletID, err := s.repo.GetUnassignedWallet(ctx)
	if err != nil {
		return err
	}

	args := storegen.UpdateWalletsParams{
		ID:       walletID,
		UserID:   event.UserID,
		Assigned: true,
	}

	update, err := s.repo.UpdateWallets(ctx, args)
	if err != nil {
		return err
	}

	err = users.AssignWallet(ctx, &users.AssignWalletRequest{UserID: event.UserID, WalletAddress: update.UsdcWalletAddress})
	if err != nil {
		return err
	}

	return nil
}

// This uses a Pub/Sub subscription, learn more: https://encore.dev/docs/primitives/pubsub
var _ = pubsub.NewSubscription(users.RequestWalletTopic, "request-wallet", pubsub.SubscriptionConfig[*users.RequestWalletEvent]{
	Handler: pubsub.MethodHandler((*Service).AssignWallet),
})
