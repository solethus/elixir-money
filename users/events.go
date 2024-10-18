package users

import "encore.dev/pubsub"

type WalletEvent struct {
	// UserID of wallet owner
	UserID int32 `json:"user_id"`
}

// RequestWalletTopic creates a Pub/Sub topic, learn more: https://encore.dev/docs/primitives/pubsub
var RequestWalletTopic = pubsub.NewTopic[*WalletEvent]("request-wallet", pubsub.TopicConfig{
	DeliveryGuarantee: pubsub.AtLeastOnce,
})
