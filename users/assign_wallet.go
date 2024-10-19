package users

import (
	"context"

	"encore.app/sqlhelp"
	"encore.app/users/store/storegen"
)

type AssignWalletRequest struct {
	UserID        int32  `json:"user_id"`
	WalletAddress string `json:"wallet_address"`
}

// AssignWallet creates a user
//
//encore:api method=POST path=/users/assign-wallet
func (s *Service) AssignWallet(ctx context.Context, req *AssignWalletRequest) error {
	userByID, err := s.repo.LookupUserByID(ctx, req.UserID)
	if err != nil {
		return err
	}

	args := storegen.UpdateUserParams{
		ID:                 userByID.ID,
		FirstName:          userByID.FirstName,
		Surname:            userByID.Surname,
		FiatWalletCurrency: userByID.FiatWalletCurrency,
		UsdcWalletAddress:  sqlhelp.ToNullString(req.WalletAddress),
	}

	err = s.repo.UpdateUser(ctx, args)
	if err != nil {
		return err
	}

	return nil
}
