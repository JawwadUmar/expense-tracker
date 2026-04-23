package routes

import (
	"net/http"

	"expensetracker.com/models"
	"expensetracker.com/service"
	"github.com/gin-gonic/gin"
)

func createExpense(c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req models.ExpenseRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
			"error":   err.Error(),
		})
		return
	}

	expense, err := service.CreateExpense(&req, userId.(int64))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create expense",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Expense created successfully",
		"data":    expense,
	})
}

func getExpenses(c *gin.Context) {
	userId, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	category := c.Query("category")
	sort := c.Query("sort") // e.g. "date_desc"
	sortDesc := sort == "date_desc"

	expenses, err := service.GetExpenses(userId.(int64), category, sortDesc)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to fetch expenses",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": expenses,
	})
}
