package payments

import (
	"encore.dev/storage/sqldb"
)

// Service struct, learn more: https://encore.dev/docs/primitives/services-and-apis/service-structs
//
//encore:service
type Service struct {
}

// initService is automatically called by Encore when the service starts up.
func initService() (*Service, error) {
	return &Service{}, nil
}

// Define a database using the database
// migrations  in the "./migrations" folder.
// Encore provisions, migrates, and connects to the database.
// Learn more: https://encore.dev/docs/primitives/databases
var db = sqldb.NewDatabase("payments", sqldb.DatabaseConfig{
	Migrations: "./store/migrations",
})
