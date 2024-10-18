package users

import (
	"context"
	_ "embed"
	"log"

	"encore.dev"
	"encore.dev/storage/sqldb"
	"encore.dev/storage/sqldb/sqlerr"
)

//go:embed fixtures.sql
var fixtures string

func init() {
	if encore.Meta().Environment.Cloud == encore.CloudLocal {
		// TODO: Add unique constraint on DB, so we don't insert every time
		if _, err := db.Exec(context.Background(), fixtures); err != nil {
			// Fixtures might already be inserted
			if sqldb.ErrCode(err) != sqlerr.UniqueViolation {
				log.Fatalln("unable to add fixtures:", err)
			}
		}
	}
}
