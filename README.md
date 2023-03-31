## Bookstore website

to run the project run the next commands:

```
npm install npm-run-all --save-dev
```
```
npm start
```
and open: http://localhost:3000
## Features:

- Register and login to the website, used firebase authentication server.
- Displaying a catalog when the products are pulled from the Mongodb.
- Shopping cart, removing and adding products to the cart.<br>
  Only registered users will be able to make a purchase.
- Product search queries with several parameter.
- API for currency exchange.
- page admin:
  - supports CRUD operations against the product  
    list in the shop.
  - Displaying the number of people browsing the
    website in real time, used socketIO.
  - Dashboard page that displays in real time- total
    revenue
    from sales, number of registered users, number of
    items on the website, the names of the books sold
    and revenue from each user.
  - User information page in real time - User  
    details table,
    details of user purchases table and Orders.
