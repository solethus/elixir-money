CREATE TABLE IF NOT EXISTS users
(
    id                      SERIAL PRIMARY KEY,
    first_name              VARCHAR(255)        NOT NULL,
    display_name            VARCHAR(255),
    country_code            VARCHAR(2),
    phone_number            VARCHAR(20),
    fiat_wallet_currency    VARCHAR(3),
    usdc_wallet_address     VARCHAR(44),
    updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_url               VARCHAR(255)
);
