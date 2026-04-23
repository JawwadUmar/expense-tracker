package service

import (
	"errors"
	"time"

	"expensetracker.com/database"
	"expensetracker.com/models"
	"gorm.io/gorm"
)

func CreateExpense(req *models.ExpenseRequest, userId int64) (*models.Expense, error) {
	// 1. Check idempotency key to prevent duplicates
	var existing models.Expense
	result := database.DB.Where("idempotency_key = ? AND user_id = ?", req.IdempotencyKey, userId).First(&existing)
	if result.Error == nil {
		// Found existing with this key, return it directly (idempotent success)
		return &existing, nil
	} else if !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return nil, result.Error
	}

	// 2. Parse date
	parsedDate, err := time.Parse(time.RFC3339, req.Date)
	if err != nil {
		// Fallback for simple date format if RFC3339 fails
		parsedDate, err = time.Parse("2006-01-02", req.Date)
		if err != nil {
			return nil, errors.New("invalid date format, use YYYY-MM-DD or RFC3339")
		}
	}

	// 3. Create new expense
	newExpense := models.Expense{
		UserId:         userId,
		Amount:         req.Amount,
		Category:       req.Category,
		Description:    req.Description,
		Date:           parsedDate,
		IdempotencyKey: req.IdempotencyKey,
	}

	err = database.DB.Create(&newExpense).Error
	if err != nil {
		return nil, err
	}

	return &newExpense, nil
}

func GetExpenses(userId int64, category string, sortDesc bool) ([]models.Expense, error) {
	var expenses []models.Expense
	query := database.DB.Where("user_id = ?", userId)

	if category != "" {
		query = query.Where("category = ?", category)
	}

	if sortDesc {
		query = query.Order("date desc")
	} else {
		query = query.Order("date asc")
	}

	err := query.Find(&expenses).Error
	if err != nil {
		return nil, err
	}

	return expenses, nil
}
