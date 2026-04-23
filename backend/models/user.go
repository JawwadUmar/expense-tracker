package models

import "time"

type User struct {
	UserId    int64     `json:"user_id" gorm:"primaryKey;autoIncrement"`
	Email     string    `json:"email" binding:"required" gorm:"unique;not null"`
	Password  *string   `json:"-" binding:"required"`
	Name      string    `json:"name" binding:"required" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"` //YYYY-MM-DD HH:MM:SS.microseconds stored in DB
	UpdatedAt time.Time `json:"updated_at"`
}

type SignupRequest struct {
	Email    string `json:"email" form:"email" binding:"required,email"`
	Password string `json:"password" form:"password" binding:"required,min=8"`
	Name     string `json:"name" form:"name" binding:"required"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}
