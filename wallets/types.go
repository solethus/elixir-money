package wallets

import "time"

type Wallet struct {
	ID                  int       `json:"id"`
	UserID              int       `json:"user_id"`
	USDCWalletAddress   string    `json:"usdc_wallet_address"`
	USDCWalletAddressPk string    `json:"usdc_wallet_address_pk"`
	USDCBalance         string    `json:"usdc_balance"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
	Assigned            bool      `json:"assigned"`
}
