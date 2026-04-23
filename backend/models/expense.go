package models

import "time"

type Expense struct {
	Id             int64     `json:"id" gorm:"primaryKey;autoIncrement"`
	UserId         int64     `json:"user_id" gorm:"not null;index"`
	Amount         float64   `json:"amount" gorm:"not null"`
	Category       string    `json:"category" gorm:"not null"`
	Description    string    `json:"description"`
	Date           time.Time `json:"date" gorm:"not null"`
	IdempotencyKey string    `json:"idempotency_key" gorm:"unique;not null"`
	CreatedAt      time.Time `json:"created_at"`
	UpdatedAt      time.Time `json:"updated_at"`
}

type ExpenseRequest struct {
	Amount         float64 `json:"amount" binding:"required,gt=0"`
	Category       string  `json:"category" binding:"required"`
	Description    string  `json:"description"`
	Date           string  `json:"date" binding:"required"` // expecting RFC3339 or simple date string
	IdempotencyKey string  `json:"idempotency_key" binding:"required"`
}
