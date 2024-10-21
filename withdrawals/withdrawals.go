// Service withdrawals facilitates the conversion of USDC back to fiat currency.
package withdrawals

// Service struct, learn more: https://encore.dev/docs/primitives/services-and-apis/service-structs
//
//encore:service
type Service struct {
	// Test
}

// initService is automatically called by Encore when the service starts up.
func initService() (*Service, error) {
	return &Service{}, nil
}
