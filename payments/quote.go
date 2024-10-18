package payments

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

const USDCode = "USD"

type QuoteParams struct {
	CurrencyCode       string  `json:"currency_code"`
	Amount             float64 `json:"amount"`
	TargetCurrencyCode string  `json:"target_currency_code"`
}

type QuoteResponse struct {
	TargetCurrencyAmount float64 `json:"target_currency_amount"`
	USDCAmount           float64 `json:"usdc_amount"`
	USDCFees             float64 `json:"usdc_fees"`
}

// Quote takes an amount in any currency, and returns a quote for that amount in USDC, and also a target currency
//
//encore:api public
func (s *Service) Quote(ctx context.Context, p *QuoteParams) (*QuoteResponse, error) {
	baseCurrency := p.CurrencyCode

	// API endpoint (e.g., from ExchangeRate-API)
	apiURL := fmt.Sprintf("https://api.exchangerate-api.com/v4/latest/%s", baseCurrency)

	// Make the HTTP request
	resp, err := http.Get(apiURL)
	if err != nil {
		log.Fatalf("Error fetching exchange rates: %v", err)
	}
	defer func() { _ = resp.Body.Close() }()

	// Decode the JSON response
	var exchangeResp ExchangeResponse
	if err := json.NewDecoder(resp.Body).Decode(&exchangeResp); err != nil {
		log.Fatalf("Error decoding response: %v", err)
	}

	// Get the rate for the target currency
	targetRate, ok := exchangeResp.Rates[p.TargetCurrencyCode]
	if !ok {
		log.Fatalf("Conversion rate for %s not found", p.TargetCurrencyCode)
	}

	// Get the rate for the target currency
	usdcRate, ok := exchangeResp.Rates[USDCode]
	if !ok {
		log.Fatalf("Conversion rate for %s not found", p.TargetCurrencyCode)
	}

	// Example usage of the conversion rate
	targetConvertedAmount := p.Amount * targetRate
	usdcConvertedAmount := p.Amount * usdcRate

	res := &QuoteResponse{
		TargetCurrencyAmount: targetConvertedAmount,
		USDCAmount:           usdcConvertedAmount,
		USDCFees:             0.0,
	}
	return res, nil
}

type ExchangeResponse struct {
	Base  string             `json:"base"`
	Rates map[string]float64 `json:"rates"`
}
