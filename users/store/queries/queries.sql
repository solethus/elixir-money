-- name: InsertIntoUsers :one
INSERT INTO users (first_name, surname, country_code, phone_number,
                   fiat_wallet_currency, usdc_wallet_address, image_url)
VALUES (@first_name :: VARCHAR(255),
        @surname :: VARCHAR(255),
        @country_code :: VARCHAR(2),
        @phone_number :: VARCHAR(20),
        @fiat_wallet_currency :: VARCHAR(3),
        @usdc_wallet_address :: VARCHAR(44),
        @image_url :: VARCHAR(255))
RETURNING id;

-- name: LookupUserByID :one
SELECT id,
       created_at,
       updated_at,
       first_name,
       surname,
       country_code,
       phone_number,
       fiat_wallet_currency,
       usdc_wallet_address,
       image_url
FROM users
WHERE id = @id :: INT;

-- name: LookupUserByPhoneNumber :one
SELECT id,
       created_at,
       updated_at,
       first_name,
       surname,
       country_code,
       phone_number,
       fiat_wallet_currency,
       usdc_wallet_address,
       image_url
FROM users
WHERE phone_number = @phone_number :: VARCHAR(20);

-- name: LookupUserByName :one
SELECT id,
       created_at,
       updated_at,
       first_name,
       surname,
       country_code,
       phone_number,
       fiat_wallet_currency,
       usdc_wallet_address,
       image_url
FROM users
WHERE first_name = @first_name :: VARCHAR(255)
  AND surname = @surname :: VARCHAR(255);

-- name: LookupUserByUSDCWallet :one
SELECT id,
       created_at,
       updated_at,
       first_name,
       surname,
       country_code,
       phone_number,
       fiat_wallet_currency,
       usdc_wallet_address,
       image_url
FROM users
WHERE usdc_wallet_address = @usdc_wallet_address :: VARCHAR(44);

-- name: UpdateUser :exec
UPDATE users
SET updated_at           = CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    first_name           = COALESCE(sqlc.arg('first_name'), first_name),
    surname              = COALESCE(sqlc.arg('surname'), surname),
    phone_number         = COALESCE(sqlc.arg('phone_number'), phone_number),
    fiat_wallet_currency = COALESCE(sqlc.arg('fiat_wallet_currency'), fiat_wallet_currency),
    usdc_wallet_address  = COALESCE(sqlc.narg('usdc_wallet_address'), usdc_wallet_address),
    image_url            = COALESCE(sqlc.arg('image_url'), image_url)
WHERE id = @id :: INT
RETURNING id;

-- name: ListUsers :many
SELECT first_name, surname, phone_number
FROM users;
