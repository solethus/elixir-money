package frontend

import (
	"embed"
	"net/http"
)

var (
	//go:embed index.html
	dist embed.FS

	handler = http.StripPrefix("/frontend/", http.FileServer(http.FS(dist)))
)

// Serve serves the frontend for development.
// For production use we recommend deploying the frontend
// using Vercel, Netlify, or similar.
//
//encore:api public raw path=/frontend/*path
func Serve(w http.ResponseWriter, req *http.Request) {
	handler.ServeHTTP(w, req)
}
