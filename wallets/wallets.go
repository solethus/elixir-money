package wallets

import (
	"database/sql"

	"encore.app/wallets/store/storegen"
	"encore.dev/storage/sqldb"
)

// Service struct, learn more: https://encore.dev/docs/primitives/services-and-apis/service-structs
//
//encore:service
type Service struct {
	db   *sql.DB
	repo storegen.Querier
}

// initService is automatically called by Encore when the service starts up.
func initService() (*Service, error) {
	stdlibDB := db.Stdlib()
	return &Service{
		db:   stdlibDB,
		repo: storegen.New(stdlibDB),
	}, nil
}

// Define a database using the database
// migrations  in the "./migrations" folder.
// Encore provisions, migrates, and connects to the database.
// Learn more: https://encore.dev/docs/primitives/databases
var db = sqldb.NewDatabase("wallets", sqldb.DatabaseConfig{
	Migrations: "./store/migrations",
})
