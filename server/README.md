# Aura Backend API

Backend server for the Aura Wellness & Meditation App built with Express.js, TypeScript, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or pnpm

### Installation

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `JWT_SECRET`: A secure random string for JWT signing
   - `CORS_ORIGIN`: Your frontend URL (default: http://localhost:5173)

3. **Setup database:**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

The API will be running at `http://localhost:3001`

## 📁 Project Structure

```
server/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── journal.controller.ts
│   │   ├── habit.controller.ts
│   │   ├── mood.controller.ts
│   │   ├── sleep.controller.ts
│   │   ├── soundscape.controller.ts
│   │   ├── reflection.controller.ts
│   │   └── analytics.controller.ts
│   ├── routes/               # API routes
│   │   ├── auth.routes.ts
│   │   ├── journal.routes.ts
│   │   ├── habit.routes.ts
│   │   ├── mood.routes.ts
│   │   ├── sleep.routes.ts
│   │   ├── soundscape.routes.ts
│   │   ├── reflection.routes.ts
│   │   └── analytics.routes.ts
│   ├── middleware/           # Custom middleware
│   │   └── auth.middleware.ts
│   └── server.ts            # Main server file
├── prisma/
│   └── schema.prisma        # Database schema
├── package.json
└── tsconfig.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Journal
- `POST /api/journal` - Create journal entry
- `GET /api/journal` - Get all journal entries (with pagination)
- `GET /api/journal/stats` - Get journal statistics
- `GET /api/journal/:id` - Get specific journal entry
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### Habits
- `POST /api/habits` - Create new habit
- `GET /api/habits` - Get all habits
- `GET /api/habits/stats` - Get habit statistics
- `GET /api/habits/:id` - Get habit completions
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete (archive) habit
- `POST /api/habits/:id/complete` - Mark habit as completed

### Moods
- `POST /api/moods` - Log mood entry
- `GET /api/moods` - Get mood history
- `GET /api/moods/stats` - Get mood statistics

### Sleep
- `POST /api/sleep` - Create sleep session
- `GET /api/sleep` - Get sleep sessions
- `GET /api/sleep/stats` - Get sleep statistics
- `PUT /api/sleep/:id` - Update sleep session

### Soundscapes
- `POST /api/soundscapes` - Log soundscape play
- `GET /api/soundscapes/history` - Get soundscape history

### Reflections
- `POST /api/reflections` - Create reflection
- `GET /api/reflections` - Get reflections
- `GET /api/reflections/timeline` - Get reflection timeline

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics
- `GET /api/analytics/detailed` - Get detailed analytics

## 🗄️ Database Schema

The database consists of the following main models:

- **User** - User accounts with authentication
- **Journal** - Journal entries with mood tracking
- **Habit** - User habits and goals
- **HabitCompletion** - Habit completion records
- **Mood** - Mood log entries
- **SleepSession** - Sleep tracking data
- **SoundscapePlay** - Soundscape playback history
- **Reflection** - Reflection entries

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

### Database Migrations

After modifying `prisma/schema.prisma`:

```bash
npm run prisma:migrate
```

## 📦 Deployment

### Using Docker (Recommended)

```bash
# Build image
docker build -t aura-backend .

# Run container
docker run -p 3001:3001 --env-file .env aura-backend
```

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables on your server

3. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret for JWT signing | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## 📝 License

MIT
