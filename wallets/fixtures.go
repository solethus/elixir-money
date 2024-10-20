package wallets

import (
	"context"
	_ "embed"
	"fmt"
	"log"

	"encore.app/users"
	"encore.dev/storage/sqldb"
	"encore.dev/storage/sqldb/sqlerr"
)

//go:embed fixtures.sql
var fixtures string

func init() {
	ctx := context.Background()

	// Define the phone numbers to look up
	phoneNumbers := []string{"+44 7911 123456", "+680 555 6789", "+27 82 345 6789"}

	// Prepare a slice to store the user IDs
	var userIDs []int32

	// Loop over the phone numbers and look up the user IDs
	for _, phoneNo := range phoneNumbers {
		senderLookupParams := users.LookupByPhoneNoParams{UserPhoneNo: phoneNo}
		lookupResponse, err := users.LookupByPhoneNo(ctx, &senderLookupParams)
		if err != nil {
			log.Fatalf("unable to lookup user by phone number %s: %v", phoneNo, err)
		}
		userIDs = append(userIDs, lookupResponse.User.ID)
	}

	// Prepare the query with the user IDs retrieved
	fixturesQuery := fmt.Sprintf(fixtures, userIDs[0], userIDs[1], userIDs[2], userIDs[0], userIDs[1], userIDs[2])

	// Execute the fixtures SQL with the user IDs as params
	if _, err := db.Exec(ctx, fixturesQuery); err != nil {
		// Fixtures might already be inserted
		if sqldb.ErrCode(err) != sqlerr.UniqueViolation {
			log.Fatalln("unable to add fixtures:", err)
		}
	}
}
