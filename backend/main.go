package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"expensetracker.com/database"
	"expensetracker.com/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Attempt to load .env file, but don't crash if it's missing (e.g. in production)
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, relying on system environment variables")
	}

	database.Init()

	server := gin.New()
	server.Use(gin.Recovery())
	server.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		statusColor := param.StatusCodeColor()
		methodColor := param.MethodColor()
		resetColor := param.ResetColor()

		return fmt.Sprintf("[GIN] %s | %s%3d%s | %12v | %s | %s%-7s%s %s\n",
			param.TimeStamp.Format("2006/01/02 - 15:04:05"),
			statusColor, param.StatusCode, resetColor,
			param.Latency,
			param.ClientIP,
			methodColor, param.Method, resetColor,
			param.Path,
		)
	}))

	// =========================
	// CORS CONFIGURATION
	// =========================
	server.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173", 
			"http://127.0.0.1:5173", 
			"http://localhost:3000",
			"https://expense-tracker-1-1omc.onrender.com",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"PATCH",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
		ExposeHeaders: []string{
			"Content-Length",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.RegisterRoutes(server)

	// Get port from environment variables (provided by Render)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8082" // Fallback to 8082 for local development
	}

	log.Printf("Starting server on port %s...", port)
	server.Run(":" + port)
}
