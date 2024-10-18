package payments

//
// import (
// 	"context"
//
// 	"github.com/shopspring/decimal"
// )
//
// type CreatePaymentParams struct {
// 	ReceiverPhoneNo string          `json:"target_phone_no"`
// 	SenderPhoneNo   string          `json:"sender_phone_no"`
// 	AmountUSDC      decimal.Decimal `json:"amount_usdc"`
// }
//
// type CreatePaymentResponse struct{}
//
// //encore:api public
// func (s *Service) CreatePayment(ctx context.Context, p *CreatePaymentParams) (*CreatePaymentResponse, error) {
// 	// senderLookupParams := &users_svc.LookupByPhoneNoParams{UserPhoneNo: p.SenderPhoneNo}
// 	//
// 	// sender, err := users.LookupByPhoneNo(ctx, senderLookupParams)
// 	// if err != nil {
// 	// 	if errors.Is(err, sql.ErrNoRows) {
// 	// 		log.Printf("no entry in the DB for sender '%v'", p.SenderPhoneNo)
// 	// 		return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for sender phone no.")
// 	// 	}
// 	// 	return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up sender")
// 	// }
// 	//
// 	// receiverLookupParams := &users.LookupByPhoneNoParams{UserPhoneNo: p.ReceiverPhoneNo}
// 	// receiver, err := s.usersSvc.LookupByPhoneNo(ctx, receiverLookupParams)
// 	// if err != nil {
// 	// 	if errors.Is(err, sql.ErrNoRows) {
// 	// 		log.Printf("no entry in the DB for receiver '%v'", p.ReceiverPhoneNo)
// 	// 		return nil, errs.Wrap(&errs.Error{Code: errs.NotFound, Message: err.Error()}, "user not found for receiver phone no.")
// 	// 	}
// 	// 	return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error looking up receiver")
// 	// }
// 	// _ = receiver
// 	// _ = sender
//
// 	return nil, nil
// }
