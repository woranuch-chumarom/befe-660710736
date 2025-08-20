package main

import (
	"github.com/gin-gonic/gin"
)

type User struct {
	ID string `json:"id"`
	Name string `json:"name"`
}
func main() {
	r := gin.Default()

	r.GET("/users", func (c *gin.Context)  {
		user:=[]User{{ID:"1", Name:"Woranuch"}} //jsonนี้คือ struct
		c.JSON(200, user) //ทำ marsell ส่งข้อมูล
	})

	r.Run(":8080")
}