package users

import (
	"context"

	"encore.app/users/store/storegen"
)

type CreateRequest struct {
	FirstName          string `json:"first_name"`
	LastName           string `json:"last_name"`
	CountryCode        string `json:"country_code"`
	PhoneNumber        string `json:"phone_number"`
	FiatWalletCurrency string `json:"fiat_wallet_currency"`
	USDCWalletCurrency string `json:"usdc_wallet_currency"`
	ImageURL           string `json:"image_url"`
}

type CreateResponse struct {
	ID                 int32  `json:"id"`
	FirstName          string `json:"firstName"`
	LastName           string `json:"lastName"`
	CountryCode        string `json:"countryCode"`
	FiatWalletCurrency string `json:"fiatWalletCurrency"`
	USDCWalletCurrency string `json:"usdcWalletCurrency"`
	ImageURL           string `json:"imageUrl"`
}

// Create creates a user
//
//encore:api public method=POST path=/user/create
func (s *Service) Create(ctx context.Context, req *CreateRequest) (*CreateResponse, error) {
	args := storegen.InsertIntoUsersParams{
		FirstName:          req.FirstName,
		Surname:            req.LastName,
		CountryCode:        req.CountryCode,
		FiatWalletCurrency: req.FiatWalletCurrency,
		PhoneNumber:        req.PhoneNumber,
		ImageUrl:           req.ImageURL,
	}

	users, err := s.repo.InsertIntoUsers(ctx, args)
	if err != nil {
		return nil, err
	}

	_, err = RequestWalletTopic.Publish(ctx, &RequestWalletEvent{
		UserID: users,
	})
	if err != nil {
		return nil, err
	}
	panic("Implement me!")
}
