# Todo API - Render Deployment

A REST API for managing todos built with Node.js, Express, TypeScript, and Prisma.

## 🚀 Deploying to Render

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**
2. **Connect to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

3. **Environment Variables (Auto-configured):**
   - `DATABASE_URL` - Automatically set from PostgreSQL database
   - `ACCESS_JWT_SECRET` - Auto-generated secure secret
   - `REFRESH_JWT_SECRET` - Auto-generated secure secret
   - `NODE_ENV` - Set to "production"

### Option 2: Manual Setup

1. **Create PostgreSQL Database:**
   - Go to Render Dashboard
   - Click "New" → "PostgreSQL"
   - Name: `todo-db`
   - Plan: Free

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Environment: Docker
   - Plan: Free

3. **Environment Variables:**
   ```
   NODE_ENV=production
   DATABASE_URL=[Copy from your PostgreSQL database]
   ACCESS_JWT_SECRET=[Generate a secure random string]
   REFRESH_JWT_SECRET=[Generate a secure random string]
   ```

## 🛠️ API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Todos (Requires Authentication)
- `GET /api/v1/todos` - Get all user's todos
- `POST /api/v1/todos` - Create new todo
- `GET /api/v1/todos/:id` - Get specific todo
- `PUT /api/v1/todos/:id` - Update todo
- `DELETE /api/v1/todos/:id` - Delete todo
- `PATCH /api/v1/todos/:id/toggle` - Toggle todo completion

### Health Check
- `GET /health` - Server health status

## 🔐 Authentication

All todo endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## 📝 Example Usage

### Register User
```bash
curl -X POST https://your-app.onrender.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Todo
```bash
curl -X POST https://your-app.onrender.com/api/v1/todos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "title": "Learn Docker"
  }'
```

## 🏗️ Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and JWT secrets
   ```

3. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📊 Database Schema

The app uses PostgreSQL with the following tables:
- `User` - User accounts
- `Todo` - Todo items linked to users
- `RefreshToken` - JWT refresh tokens

## 🔒 Security Features

- Password hashing with bcrypt
- JWT access tokens (30 minutes)
- JWT refresh tokens (30 days)
- Token rotation on refresh
- Input validation and sanitization
- CORS enabled
- Request logging with Morgan

## 🐳 Docker

The app includes a production-ready Dockerfile with:
- Multi-stage build optimization
- Non-root user for security
- Health checks
- Minimal Alpine Linux base image
