# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- morgan
- dotenv
- sequelize(mysql)

---

## URL

_Server_

```
http://localhost:4100
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "status": "Internal Server Error",
  "message": "Something wen't wrong"
}
```

---

## RESTful endpoints

### POST /api/product

> create product

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "name":"<name>",
  "description":"<description>",
  "price":"<price>",
  "categoryId":"<categoryId>",
  "quantity":"<quantity>",
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Create product successfully!"
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "Category Not Found"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

---

### PUT /api/product/:productId

> update product

_Request Header_

```
not needed
```

_Request Params_

```
/<product_id>
```

_Request Body_

```
{
  "name":"<name>",
  "description":"<description>",
  "price":"<price>",
  "categoryId":"<categoryId>",
  "quantity":"<quantity>",
}
```

_Response (200)_

```
{
    "message": "Updated",
    "data": "Product update successfully!"
}
```

_Response (404)_

```
{
    "status": "Not Found",
    "message": "Category Not Found"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

---

### GET /api/products

> get all product

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Query_

```
?pageNumber=<number>,
?pageSize=<number>
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  count:<count_products>,
  next:"<URL_next_page>",
  previous:"<URL_previous_page>",
  results:[<product_list>]
}
}
```

---

### POST /api/category

> create category

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "name":"<name>"
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Create category successfully!"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

---

### GET /api/categories

> get all category

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Query_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  count:<count_products>,
  results:[<category_list>]
}
}
```

---

### POST /api/cart

> add to cart

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "userId":<user_id>,
  "productiD":<product_id>,
  "quantity":<number>,
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Product added to cart successfully"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "User or Product not found"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"userId\" is number, positive number, required"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"userId\" is number, positive number, required"
}
```

---

### GET /api/carts/:userId

> get all cart user

_Request Header_

```
not needed
```

_Request Params_

```
/<user_id>
```

_Request Query_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  <cart_data>,
  Product:[<product_data>]
}
```

}
_Response (404) Notfound_

```
{
    "message": "Not found",
    "data": "User not found"
}
```

---

### Delete /api/cart/:userId/:productId

> add to cart

_Request Header_

```
not needed
```

_Request Params_

```
/<user_id>/<product_id>
```

_Request Body_

```
{
  "userId":<user_id>,
  "productiD":<product_id>,
  "quantity":<number>,
}
```

_Response (200)_

```
{
    "message": "Deleted",
    "data": "Product removed from cart successfully"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "Product not found in cart"
}
```

_Response (404 - Notfound)_

```
{
    "status": "Not Found",
    "message": "Cart not found for the user"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"userId\" is number, positive number, required"
}
```

---

### POST /api/user

> create user

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "name":"<name>"
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Create user successfully!"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"name\" length must be at least 3 characters long"
}
```

---

### POST /api/order

> create order

_Request Header_

```
not needed
```

_Request Params_

```
not needed
```

_Request Body_

```
{
    "userId":<user_id>,
    "orderItems":[
        {
            "productId":<product_id>,
            "quantity":<number>,
            "totalPrice":<number>
        }
    ]
}
```

_Response (201)_

```
{
    "message": "Created",
    "data": "Create order successfully!"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": ""\"orderItems[0].productId\" must be a positive number"
}
```

_Response (404 - Not found)_

```
{
    "status": "Not Found",
    "message": "User not found"
}
```

_Response (400 - Bad request)_

```
{
    "status": "Bad request",
    "message": "<product_name> out of stock"
}
```

---

### POST /api/order/:userId

> get order

_Request Header_

```
not needed
```

_Request Params_

```
/<user_id>
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Ok",
    "data": {
  <order_data>,
  OrdeDetails:[
    <order_list>,
    Product:{<data_product>}
  ]
}
}
```

_Response (200) no content_

```
{
    "message": "Ok",
    "data": null

}
```

_Response (404 - Not found)_

```
{
    "status": "Not Found",
    "message": "User not found"
}
```

---
