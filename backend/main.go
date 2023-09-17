package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	i := new(int)
	*i = 29

	fmt.Println(*i)

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello!")
	})

	app.Listen(":8000")
}
