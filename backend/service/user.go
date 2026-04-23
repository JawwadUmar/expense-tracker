package service

import (
	"errors"

	"expensetracker.com/models"
	"expensetracker.com/repository"
	"expensetracker.com/utility"
)

func ManageSignUp(signupRequest *models.SignupRequest) error {
	var user models.User
	user.Email = signupRequest.Email
	hashedPassword, err := utility.HashPassword(signupRequest.Password)
	if err != nil {
		return errors.New("Unable to hash password")
	}
	user.Password = hashedPassword
	user.Name = signupRequest.Name

	_, err = repository.GetUserModelByEmail(user.Email)

	if err == nil {
		return errors.New("User Already Exists")
	}

	return repository.CreateUser(&user)

}

func ManageLogin(loginRequest *models.LoginRequest) (*models.User, string, error) {
	user, err := repository.GetUserModelByEmail(loginRequest.Email)

	if err != nil {
		return nil, "", errors.New("User Not Found")
	}

	hashedPassword, err := repository.GetHashedPasswordByEmail(user.Email)

	if err != nil {
		return nil, "", errors.New("Unable to retrieve hashed password")
	}

	if !utility.ValidateEnteredPassword(loginRequest.Password, *hashedPassword) {
		return nil, "", errors.New("Invalid Password")
	}

	token, err := utility.GenerateToken(user.Email, user.UserId)

	if err != nil {
		return nil, "", errors.New("Unable to generate token")
	}

	return user, token, nil
}
