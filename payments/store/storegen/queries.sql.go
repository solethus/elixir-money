// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0
// source: queries.sql

package storegen

import (
	"context"
)

const insertIntoPayments = `-- name: InsertIntoPayments :one
INSERT INTO payments (sender_id, receiver_id, amount_usdc, tx_hash)
VALUES ($1 :: VARCHAR(255),
        $2 :: VARCHAR(2),
        $3 :: VARCHAR(20),
        $4 :: VARCHAR(66))
RETURNING id
`

type InsertIntoPaymentsParams struct {
	SenderID   string
	ReceiverID string
	AmountUsdc string
	TxHash     string
}

func (q *Queries) InsertIntoPayments(ctx context.Context, arg InsertIntoPaymentsParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, insertIntoPayments,
		arg.SenderID,
		arg.ReceiverID,
		arg.AmountUsdc,
		arg.TxHash,
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const lookupPaymentByReceiverId = `-- name: LookupPaymentByReceiverId :many
SELECT id,
       sender_id,
       receiver_id,
       amount_usdc,
       payment_date,
       tx_hash
FROM payments
WHERE receiver_id = $1 :: VARCHAR(2)
`

func (q *Queries) LookupPaymentByReceiverId(ctx context.Context, receiverID string) ([]Payment, error) {
	rows, err := q.db.QueryContext(ctx, lookupPaymentByReceiverId, receiverID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Payment
	for rows.Next() {
		var i Payment
		if err := rows.Scan(
			&i.ID,
			&i.SenderID,
			&i.ReceiverID,
			&i.AmountUsdc,
			&i.PaymentDate,
			&i.TxHash,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const lookupPaymentByTxHash = `-- name: LookupPaymentByTxHash :one
SELECT id,
       sender_id,
       receiver_id,
       amount_usdc,
       payment_date,
       tx_hash
FROM payments
WHERE tx_hash = $1 :: VARCHAR(66)
`

func (q *Queries) LookupPaymentByTxHash(ctx context.Context, txHash string) (Payment, error) {
	row := q.db.QueryRowContext(ctx, lookupPaymentByTxHash, txHash)
	var i Payment
	err := row.Scan(
		&i.ID,
		&i.SenderID,
		&i.ReceiverID,
		&i.AmountUsdc,
		&i.PaymentDate,
		&i.TxHash,
	)
	return i, err
}
