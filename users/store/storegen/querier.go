// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package storegen

import (
	"context"
)

type Querier interface {
	InsertIntoUsers(ctx context.Context, arg InsertIntoUsersParams) (int32, error)
	LookupUserByID(ctx context.Context, id int32) (LookupUserByIDRow, error)
	LookupUserByName(ctx context.Context, arg LookupUserByNameParams) (LookupUserByNameRow, error)
	LookupUserByPhoneNumber(ctx context.Context, phoneNumber string) (LookupUserByPhoneNumberRow, error)
	LookupUserByUSDCWallet(ctx context.Context, usdcWalletAddress string) (LookupUserByUSDCWalletRow, error)
	UpdateUser(ctx context.Context, arg UpdateUserParams) error
}

var _ Querier = (*Queries)(nil)
