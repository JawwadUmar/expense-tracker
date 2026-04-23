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

	registerExpenseRoutes(protected)
}

func registerExpenseRoutes(rg *gin.RouterGroup) {
	expenses := rg.Group("/expenses")
	{
		expenses.POST("", createExpense)
		expenses.GET("", getExpenses)
	}
}

func registerUserRoutes(rg *gin.RouterGroup) {
	users := rg.Group("/users")
	{
		users.POST("/signup", signup)
		users.POST("/login", login)
	}
}
