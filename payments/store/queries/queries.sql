-- name: InsertIntoPayments :one
INSERT INTO payments (sender_id, receiver_id, amount_usdc, tx_hash)
VALUES (@sender_id :: VARCHAR(255),
        @receiver_id :: VARCHAR(2),
        @amount_usdc :: VARCHAR(20),
        @tx_hash :: VARCHAR(66))
RETURNING id;

-- name: LookupPaymentByReceiverId :many
SELECT id,
       sender_id,
       receiver_id,
       amount_usdc,
       payment_date,
       tx_hash
FROM payments
WHERE receiver_id = @receiver_id :: VARCHAR(2);

-- name: LookupPaymentByTxHash :one
SELECT id,
       sender_id,
       receiver_id,
       amount_usdc,
       payment_date,
       tx_hash
FROM payments
WHERE tx_hash = @tx_hash :: VARCHAR(66);
