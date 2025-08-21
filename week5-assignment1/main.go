package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)

// Student struct
type Product struct {
    ID       string  `json:"id"`
    Name     string  `json:"name"`
    Stock     int     `json:"stock"`
    Price      float64 `json:"price"`
}

// In-memory database (ในโปรเจคจริงใช้ database)
var products = []Product{
    {ID: "1", Name: "Royal Canin", Stock: 3, Price: 590.50},
    {ID: "2", Name: "SmartHeart", Stock: 2, Price: 125.00},
	{ID: "3", Name: "Kaniva", Stock: 1, Price: 275.75},
	{ID: "4", Name: "Buzz", Stock: 2, Price: 570.00},
	{ID: "5", Name: "Parrot food", Stock: 3, Price: 120.00},
}

func getProducts(c *gin.Context) { 
	stockQuery := c.Query("stock")

	if stockQuery != ""{
		filter := []Product{}
		for _, product := range products { //วนข้อมูลใน slice
			if fmt.Sprint(product.Stock) == stockQuery { //แปลงint เป็น string ตรง student.Year
				filter = append(filter, product)
			}
		}
		c.JSON(http.StatusOK, filter)
		return
	}
	c.JSON(http.StatusOK, products)
}

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context){
		c.JSON(200, gin.H{"message" : "healthy"})
	})

	api := r.Group("/api/v1") 
	{
		api.GET("/products", getProducts)
	}

	r.Run(":8080")
}