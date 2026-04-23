package main

import (
	"fmt"
	"log"
	"time"

	"expensetracker.com/database"
	"expensetracker.com/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
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
		AllowAllOrigins: true,
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
	server.Run(":8082")
}
