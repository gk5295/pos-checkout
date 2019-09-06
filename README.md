# Product details and checkout

A simple checkout system written in node.js

## Requirements

* NODE: `>= 10`
* YARN: `1.9.4`
* POSTGRES: `9.6`
* DATABASE: `till_pos_product`, `till_pos_product_test`

## Setup

```bash
# clone the project
git clone https://github.com/avdkishore/pos-checkout.git && cd pos-checkout

# install the dependencies
yarn

# start the project
yarn start

# test
yarn test
```

* This starts the server on the port 5200
* database seeds are located in `/src/sql/seeds`. These need to be run in the database

## APIs availabe

Fetch all the available products

```curl
curl -X GET http://localhost:5200/api/v1/products
```

Get the final price for the products added to checkout

```curl
curl -X POST http://localhost:5200/api/v1/products/price \
  -H 'Accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "customer": "Facebook",
  "items": [{ "type": "medium", "qty": 6 }]
}'
```

Get all the available offers for a customer

```curl
curl -X GET 'http://localhost:5200/api/v1/offers?customer=Facebook'
```

Create new offer

```curl
curl -X POST http://localhost:5200/api/v1/offers?auth=true&admin=true \
  -H 'Content-Type: application/json' \
  -d '{
  "customer": "TCS",
  "description": "some desc",
    "type": "discount",
    "value": { "product": "small", "finalPrice": "299.99" }
}'
```

