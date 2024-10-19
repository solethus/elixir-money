package withdrawals

import (
	"context"

	"encore.app/payments"
)

type CreateParams struct{}

type CreateResponse struct{}

//encore:api public path=/withdrawals/create
func Create(ctx context.Context, p *CreateParams) (*CreateResponse, error) {
	// Don't want to actually make this call, just adding it here so it appears on the diagram
	response, err := payments.Send(ctx, &payments.SendParams{
		ReceiverPhoneNo: "",
		SenderPhoneNo:   "",
		AmountUSDC:      0,
	})
	if err != nil {
		return nil, err
	}

	_ = response
	return &CreateResponse{}, nil
}
