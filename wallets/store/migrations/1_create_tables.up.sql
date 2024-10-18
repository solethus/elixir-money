CREATE TABLE IF NOT EXISTS wallets
(
    id                      SERIAL PRIMARY KEY,
    user_id                 INT NOT NULL,
    usdc_wallet_address     VARCHAR(44) NOT NULL,
    usdc_wallet_address_pk  VARCHAR(88) NOT NULL,
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned                BOOL NOT NULL DEFAULT FALSE
);
