package payments

import "context"

type CreatePaymentParams struct {
	PhoneNumber string `json:"phone_number"`
}

type CreatePaymentResponse struct{}

//encore:api public
func CreatePayment(ctx context.Context, p *CreatePaymentParams) (*CreatePaymentResponse, error) {
	return nil, nil
}
