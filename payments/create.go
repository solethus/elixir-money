package payments

import (
	"context"
	"database/sql"
	"errors"
	"log"

	"encore.app/users"
	"encore.dev/beta/errs"
)

type SendParams struct {
	ReceiverPhoneNo string  `json:"target_phone_no"`
	SenderPhoneNo   string  `json:"sender_phone_no"`
	AmountUSDC      float64 `json:"amount_usdc"`
}

type SendResponse struct{}

//encore:api public
func (s *Service) Send(ctx context.Context, p *SendParams) (*SendResponse, error) {
	senderLookupParams := &users.LookupByPhoneNoParams{UserPhoneNo: p.SenderPhoneNo}

	sender, err := users.LookupByPhoneNo(ctx, senderLookupParams)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Printf("no entry in the DB for sender '%v'", p.SenderPhoneNo)
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for sender phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up sender")
	}

	receiverLookupParams := &users.LookupByPhoneNoParams{UserPhoneNo: p.ReceiverPhoneNo}
	receiver, err := users.LookupByPhoneNo(ctx, receiverLookupParams)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Printf("no entry in the DB for receiver '%v'", p.ReceiverPhoneNo)
			return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for receiver phone no.")
		}
		return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up receiver")
	}
	_ = receiver
	_ = sender

	return nil, nil
}
