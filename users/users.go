// Service users handles user related information
package users

import (
	"encore.app/users/store/storegen"
	"encore.dev/storage/sqldb"
)

// Service struct, learn more: https://encore.dev/docs/primitives/services-and-apis/service-structs
//
//encore:service
type Service struct {
	repo storegen.Querier
}

// initService is automatically called by Encore when the service starts up.
func initService() (*Service, error) {
	stdlibDB := db.Stdlib()

	return &Service{
		repo: storegen.New(stdlibDB),
	}, nil
}

// Define a database using the database
// migrations  in the "./migrations" folder.
// Encore provisions, migrates, and connects to the database.
// Learn more: https://encore.dev/docs/primitives/databases
var db = sqldb.NewDatabase("users", sqldb.DatabaseConfig{
	Migrations: "./store/migrations",
})
