package users

import "time"

type User struct {
	ID                 int32     `json:"id"`
	FirstName          string    `json:"first_name"`
	Surname            string    `json:"surname"`
	CountryCode        string    `json:"country_code"`
	PhoneNumber        string    `json:"phone_number"`
	FiatWalletCurrency string    `json:"fiat_wallet_currency"`
	USDCWalletAddress  string    `json:"usdc_wallet_address"`
	ImageUrl           string    `json:"image_url"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}
