package payments

import (
	"context"
	"encoding/json"
	"fmt"
	"math"
	"net/http"

	"encore.dev/rlog"

	"encore.dev/beta/errs"
)

const USDCode = "USD"

type QuoteParams struct {
	CurrencyCode       string  `json:"currency_code"`
	Amount             float64 `json:"amount"`
	TargetCurrencyCode string  `json:"secondary_currency_code"` // Other currency to get the quote in, aside from USDC.
}

type QuoteResponse struct {
	SecondaryCurrencyQuote float64 `json:"secondary_currency_quote"` // Won't actually be used in the send, just for information purposes to show to user.
	USDCAmount             float64 `json:"usdc_amount"`
	USDCFees               float64 `json:"usdc_fees"`
}

var quoteCache []ExchangeResponse

// Quote takes an amount in any currency, and returns a quote for that amount in USDC, and also a target currency
//
//encore:api public path=/payments/quote
func (s *Service) Quote(ctx context.Context, p *QuoteParams) (*QuoteResponse, error) {
	baseCurrency := p.CurrencyCode

	var quote *ExchangeResponse
	quote = getQuoteFromCache(baseCurrency)
	if quote == nil {
		rlog.Info("quote not found, going to live API")
		// Get Quote from ExchangeRate-API if we don't have it in cache
		apiURL := fmt.Sprintf("https://api.exchangerate-api.com/v4/latest/%s", baseCurrency)

		// Make the HTTP request
		resp, err := http.Get(apiURL)
		if err != nil {
			return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error fetching exchange rates")
		}
		defer func() { _ = resp.Body.Close() }()

		// Decode the JSON response
		if err := json.NewDecoder(resp.Body).Decode(&quote); err != nil {
			return nil, errs.Wrap(&errs.Error{Code: errs.Unknown, Message: err.Error()}, "error decoding response")
		}

		quoteCache = append(quoteCache, *quote)
	}

	// Get the rate for the target currency
	targetRate, ok := quote.Rates[p.TargetCurrencyCode]
	if !ok {
		return nil, &errs.Error{Code: errs.Unknown, Message: fmt.Sprintf("conversion rate for %s not found", p.TargetCurrencyCode)}
	}

	// Get the rate for the target currency
	usdcRate, ok := quote.Rates[USDCode]
	if !ok {
		return nil, &errs.Error{Code: errs.Unknown, Message: fmt.Sprintf("conversion rate for %s not found", USDCode)}
	}

	// Example usage of the conversion rate
	targetConvertedAmount := p.Amount * targetRate
	usdcConvertedAmount := p.Amount * usdcRate

	res := &QuoteResponse{
		SecondaryCurrencyQuote: truncateToTwoDecimals(targetConvertedAmount),
		USDCAmount:             truncateToTwoDecimals(usdcConvertedAmount),
		USDCFees:               0.00,
	}
	return res, nil
}

func truncateToTwoDecimals(value float64) float64 {
	truncatedValue := math.Trunc(value*100) / 100
	return truncatedValue
}

func getQuoteFromCache(baseCurrency string) *ExchangeResponse {
	for _, r := range quoteCache {
		if r.Base == baseCurrency {
			rlog.Info("got quote for from cache",
				"baseCurrency", baseCurrency)
			return &r
		}
	}
	return nil
}

type cachedAmounts struct {
	ExchangeResponses []ExchangeResponse
}

type ExchangeResponse struct {
	Base  string             `json:"base"`
	Rates map[string]float64 `json:"rates"`
}
