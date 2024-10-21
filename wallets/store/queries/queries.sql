-- name: InsertIntoWallets :one
INSERT INTO wallets (user_id, usdc_wallet_address, usdc_wallet_address_pk, usdc_balance)
VALUES (@user_id :: INT,
        @usdc_wallet_address :: VARCHAR(44),
        @usdc_wallet_address_pk :: VARCHAR(88),
        @usdc_balance :: FLOAT)
RETURNING id;

-- name: GetUnassignedWallet :one
SELECT id
FROM wallets
WHERE assigned = FALSE
ORDER BY created_at DESC
LIMIT 1;


-- name: UpdateWallets :one
UPDATE wallets
SET updated_at = CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    user_id    = COALESCE(sqlc.arg('user_id'), user_id),
    assigned   = COALESCE(sqlc.arg('assigned'), assigned)
WHERE id = @id :: INT
RETURNING id
    , usdc_wallet_address;

-- name: UpdateWalletBalance :exec
UPDATE wallets
SET usdc_balance = usdc_balance - $1,
    updated_at = CURRENT_TIMESTAMP
WHERE user_id = $2;

-- name: LookupWalletBalance :one
SELECT usdc_balance
FROM wallets
WHERE user_id = $1;

-- name: LookupWallet :one
SELECT id, user_id, usdc_wallet_address, usdc_wallet_address_pk, usdc_balance, created_at, updated_at, assigned
FROM wallets
WHERE user_id = $1;

-- name: CountUnassignedWallets :many
SELECT COUNT(*)
FROM wallets
LIMIT 1;
