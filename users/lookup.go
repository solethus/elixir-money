package users

import (
	"context"
	"database/sql"
	"errors"

	"encore.dev/beta/errs"
)

type LookupByPhoneNoParams struct {
	UserPhoneNo string `form:"user_phone_no"`
}

type LookupByPhoneNoResponse struct {
	User User `json:"user"`
}

//encore:api public
func (s *Service) LookupByPhoneNo(ctx context.Context, p *LookupByPhoneNoParams) (*LookupByPhoneNoResponse, error) {
	// TODO: Remove spaces from phone number, update DB to not have spaces
	user, err := s.repo.LookupUserByPhoneNumber(ctx, p.UserPhoneNo)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up user")
	}

	return &LookupByPhoneNoResponse{User: User{
		ID:                 user.ID,
		FirstName:          user.FirstName,
		Surname:            user.Surname,
		CountryCode:        user.CountryCode,
		PhoneNumber:        user.PhoneNumber,
		FiatWalletCurrency: user.FiatWalletCurrency,
		USDCWalletAddress:  user.UsdcWalletAddress.String,
		ImageUrl:           user.ImageUrl.String,
		CreatedAt:          user.CreatedAt,
		UpdatedAt:          user.UpdatedAt,
	}}, nil
}
