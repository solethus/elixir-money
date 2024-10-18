-- name: InsertIntoWallets :one
INSERT INTO wallets (user_id, usdc_wallet_address, usdc_wallet_address_pk)
VALUES (@user_id :: INT,
        @usdc_wallet_address :: VARCHAR(44),
        @usdc_wallet_address_pk :: VARCHAR(88)
        )
RETURNING id;

-- name: GetUnassignedWallet :one
SELECT id
FROM wallets
WHERE assigned = FALSE
ORDER BY created_at DESC
LIMIT 1;


-- name: UpdateWallets :one
UPDATE wallets
SET updated_at           = CURRENT_TIMESTAMP AT TIME ZONE 'UTC',
    user_id = COALESCE(sqlc.arg('user_id'), user_id),
    assigned = COALESCE(sqlc.arg('assigned'), assigned)
WHERE id = @id :: INT
RETURNING id, usdc_wallet_address;
