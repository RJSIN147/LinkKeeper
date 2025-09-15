# LinkKeeper API — Bookmark Manager Backend

## Problem
A backend API for a bookmark manager where users can save and organize links with tags, descriptions, and search functionality.

---

## Tech Stack
- *Backend*: Node.js + Express (JavaScript)  
- *Database*: MongoDB (Mongoose ODM)  
- *Auth*: JWT stored in HTTP-only cookies  
- *Architecture*: MVC (Models, Controllers, Routes)  

---

## Data Model

ts
User {
  _id: ObjectId,
  email: string,
  passwordHash: string,
  createdAt: Date
}

Link {
  _id: ObjectId,
  userId: ObjectId (ref: User),
  url: string,
  title: string,
  description?: string,
  tags: [string],
  createdAt: Date
}
`

---

## API Design

### Auth

* POST /auth/signup → create account
* POST /auth/login → authenticate & set JWT cookie
* POST /auth/logout → clear JWT cookie
* GET /auth/me → return logged-in user profile

### Links

* GET /links?tag=js&search=react
  Response:

  json
  [
    { "id":"l1","url":"https://react.dev","title":"React Docs","tags":["js","react"] }
  ]
  

* POST /links

  json
  { "url":"https://openai.com","title":"OpenAI","tags":["ai","ml"] }
  

* PATCH /links/:id

  json
  { "title":"OpenAI Official Site","tags":["ai"] }
  

* DELETE /links/:id

*Notes:*

* All /links routes require authentication (JWT cookie).
* Return appropriate HTTP status codes and error messages.
* Validate inputs using middleware.

---

## Best Practices

* Use MVC separation:

  * /models for Mongoose schemas
  * /controllers for business logic
  * /routes for endpoints
* Use .env for secrets (JWT secret, DB URI).
* JWT stored in *HTTP-only, Secure cookies*.
* Passwords hashed with bcrypt.
* Clean, well-commented code.
* Error handling middleware for consistent responses.
* Unit tests for controllers and utils (Jest preferred).

---

## Suggested Project Structure


/linkkeeper-api
  /config
    db.js              # MongoDB connection
    token.js           # JWT token generation function
  /models
    User.js
    Link.js
  /controllers
    authController.js
    linkController.js
  /routes
    authRoutes.js
    linkRoutes.js
  /middleware
    authMiddleware.js
  server.js            # Express app entry point
  package.json
  .env
  README.md


---

## Deliverables

* Fully working backend API with Express + MongoDB.
* Clear MVC folder structure.
* Well-commented, best-practice code.

---