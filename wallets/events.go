package wallets

import "encore.dev/pubsub"

type AssignWalletEvent struct {
	// UserID of wallet owner
	UserID int32 `json:"user_id"`
	// WalletAddress is the address of the user
	WalletAddress string `json:"wallet_address"`
}

// AssignWalletTopic creates a Pub/Sub topic, which assigns a wallet to a user
// Learn more: https://encore.dev/docs/primitives/pubsub
var AssignWalletTopic = pubsub.NewTopic[*AssignWalletEvent]("assign-wallet", pubsub.TopicConfig{
	DeliveryGuarantee: pubsub.AtLeastOnce,
})
