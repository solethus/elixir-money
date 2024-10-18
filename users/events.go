package users

import "encore.dev/pubsub"

type RequestWalletEvent struct {
	// UserID of wallet owner
	UserID int32 `json:"user_id"`
}

// RequestWalletTopic creates a Pub/Sub topic, learn more: https://encore.dev/docs/primitives/pubsub
var RequestWalletTopic = pubsub.NewTopic[*RequestWalletEvent]("request-wallet", pubsub.TopicConfig{
	DeliveryGuarantee: pubsub.AtLeastOnce,
})
