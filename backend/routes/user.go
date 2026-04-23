package routes

import (
	"net/http"

	"expensetracker.com/models"
	"expensetracker.com/service"
	"github.com/gin-gonic/gin"
)

func signup(context *gin.Context) {
	var signupRequest models.SignupRequest
	err := context.ShouldBind(&signupRequest) //not with JSON as it will be a form data :)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Unable to pass the values into the user object",
			"error":   err.Error(),
		})
		return
	}
	err = service.ManageSignUp(&signupRequest)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Unable to create user",
			"error":   err.Error(),
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"message": "User created successfully",
	})
}

func login(context *gin.Context) {
	var loginRequest models.LoginRequest
	err := context.ShouldBindBodyWithJSON(&loginRequest)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"message": "Unable to pass the values into the user object",
			"error":   err.Error(),
		})
		return
	}
	user, token, err := service.ManageLogin(&loginRequest)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Unable to login user",
			"error":   err.Error(),
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"message": "User logged in successfully",
		"token":   token,
		"data":    user,
	})
}
