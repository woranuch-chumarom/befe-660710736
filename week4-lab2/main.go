package main

import (
	"fmt"
)
// var email string = "chumarom_w@silpakorn.edu"

func main() {
	//var name string = "woranuch"
	var age int = 20

	email := "chumarom_w@silpakorn.edu"
	gpa := 4.00

	firstname, lastname := "woranuch", "chumarom"

	fmt.Printf("Name %s %s, age %d, email %s, gpa %.2f\n", firstname, lastname, age, email,gpa)

}