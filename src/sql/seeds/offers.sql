INSERT INTO "offers"("customer", "description", "type", "value") VALUES('Infosys', ' Gets a 3 for 2 deal for Small Pizzas', 'deal', '{
  "product": "small",
  "qty": 3,
  "finalQty": 2
}') RETURNING "id", "customer", "description", "type", "value", "createdAt", "updatedAt";
INSERT INTO "offers"("customer", "description", "type", "value") VALUES('Amazon', 'Gets a discount on Large Pizza where the price drops to $299.99 per pizza', 'discount', '{
  "product": "large",
  "finalPrice": "299.99"
}') RETURNING "id", "customer", "description", "type", "value", "createdAt", "updatedAt";
INSERT INTO "offers"("customer", "description", "type", "value") VALUES('Facebook', 'Gets a 5 for 4 deal on Medium Pizza', 'deal', '{
  "product": "medium",
  "qty": 5,
  "finalQty": 4
}') RETURNING "id", "customer", "description", "type", "value", "createdAt", "updatedAt";
INSERT INTO "offers"("customer", "description", "type", "value") VALUES('Facebook', 'Gets a discount on Large Pizza where the price drops to $389.99 per pizza', 'discount', '{
  "product": "large",
  "finalPrice": "389.99"
}') RETURNING "id", "customer", "description", "type", "value", "createdAt", "updatedAt";
