// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.27.0

package storegen

import (
	"database/sql"
)

type Payment struct {
	ID          int32
	SenderID    sql.NullString
	ReceiverID  sql.NullString
	AmountUsdc  sql.NullString
	PaymentDate sql.NullTime
	TxHash      sql.NullString
}
