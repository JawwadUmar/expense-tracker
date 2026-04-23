package repository

import (
	"expensetracker.com/database"
	"expensetracker.com/models"
)

func GetUserModelByEmail(email string) (*models.User, error) {
	var user models.User
	err := database.DB.Where("email = ?", email).First(&user).Error
	return &user, err
}

func CreateUser(user *models.User) error {
	err := database.DB.Create(user).Error
	return err
}

func GetHashedPasswordByEmail(email string) (*string, error) {
	var user models.User
	err := database.DB.Where("email = ?", email).Select("password").First(&user).Error
	return user.Password, err
}
