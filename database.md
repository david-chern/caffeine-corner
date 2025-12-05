# Report: Caffeine Corner E-Commerce Database for Node/Express/SQLite

This report describes a **minimal but full-stack-ready** e-commerce database design for a **paint shop** built with **Node.js, Express, and SQLite**.

It focuses on:

1. How to **organize the DB module** in the Node project  
2. A **minimal database structure** suitable for a full-stack app  
3. What **methods** the DB module should expose  
4. Concrete **implementation** of those methods  
5. Clear **filenames** and **how to run** the code  

---

## 1. Project & DB Module Organization

### 1.1 Suggested Project Structure

```text
caffeine-corner-app/
  package.json
  server.js

  db/
    schema.sql
    init.js
    index.js        <-- main DB module

  routes/
    products.js
    customers.js
    cart.js

  data/
    caffeine-corner.db   <-- SQLite file (created by init.js)
