package sqlhelp

import (
	"database/sql"
)

func ToNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false} // NULL for empty strings
	}
	return sql.NullString{
		String: s,
		Valid:  true,
	}
}
