package users

import (
	"context"
	"database/sql"
	"errors"

	"encore.dev/beta/errs"
)

type ListUsersResponse struct {
	Users []User `json:"user"`
}

//encore:api public path=/users
func (s *Service) ListUsers(ctx context.Context) (*ListUsersResponse, error) {
	users, err := s.repo.ListUsers(ctx)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "no users found.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up users")
	}

	var resp ListUsersResponse
	for _, user := range users {
		resp.Users = append(resp.Users, User{
			FirstName:   user.FirstName,
			Surname:     user.Surname,
			PhoneNumber: user.PhoneNumber,
		})
	}

	return &resp, nil
}
