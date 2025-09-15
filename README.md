# LinkKeeper API

Bookmark Manager backend API built with Express and MongoDB.

## Setup

1. Copy `.env.example` to `.env` and set values.
2. Install dependencies:
```
npm install
```
3. Run the server:
```
npm run dev
```

## Endpoints

- Auth: `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`
- Links: `GET /links?tag=js&search=react`, `POST /links`, `PATCH /links/:id`, `DELETE /links/:id`
