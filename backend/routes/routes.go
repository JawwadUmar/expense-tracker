package routes

import (
	"expensetracker.com/middleware"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	api := server.Group("/api/v1")

	// PUBLIC routes (no auth)
	registerUserRoutes(api)

	// PROTECTED routes
	protected := api.Group("")
	protected.Use(middleware.AuthMiddleware())
}

func registerUserRoutes(rg *gin.RouterGroup) {
	users := rg.Group("/users")
	{
		users.POST("/signup", signup)
		users.POST("/login", login)
	}
}
