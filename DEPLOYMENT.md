# Aura - Complete Backend + Frontend Integration Guide

## 🎯 Overview

This document provides step-by-step instructions to set up and run the complete Aura application with both frontend and backend integration.

## 📋 Prerequisites

- Node.js v18 or higher
- PostgreSQL 14 or higher
- Docker & Docker Compose (for containerized deployment)
- npm or pnpm

## 🚀 Quick Start (Development)

### 1. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL="postgresql://postgres:password@localhost:5432/aura_db?schema=public"
# JWT_SECRET="your-super-secret-jwt-key"

# Generate Prisma client and run migrations
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

Backend will run at `http://localhost:3001`

### 2. Setup Frontend

```bash
# Navigate to root directory
cd ..

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:3001/api

# Start development server
npm run dev
```

Frontend will run at `http://localhost:5173`

## 🐳 Docker Deployment

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3001
- Frontend on port 5173

### Option 2: Manual Docker Build

```bash
# Build the image
docker build -t aura-app .

# Run PostgreSQL
docker run -d \
  --name aura-postgres \
  -e POSTGRES_USER=aura \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=aura_db \
  -p 5432:5432 \
  postgres:16-alpine

# Run the application
docker run -d \
  --name aura-app \
  -p 3001:3001 \
  -p 5173:5173 \
  -e DATABASE_URL="postgresql://aura:your_password@aura-postgres:5432/aura_db" \
  -e JWT_SECRET="your-secret-key" \
  --link aura-postgres \
  aura-app
```

## 📱 Application Flow

### 1. Authentication
- New users are presented with a login/register screen
- Upon successful registration/login, JWT token is stored
- Token is automatically included in all API requests

### 2. Onboarding (First-time users)
- Name collection
- Initial mood selection
- Breathing exercise
- Data is stored via API

### 3. Main Application
All screens are now connected to the backend:
- **Journal**: Create, read, update, delete entries
- **Habits**: Track habits with real-time streak calculations
- **Mood Tracking**: Log moods with analytics
- **Sleep Coach**: Record sleep sessions
- **Analytics**: Real-time dashboard with actual user data
- **Reflections**: Timeline of emotional journey

## 🔧 API Endpoints Reference

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/profile     - Get user profile
PUT    /api/auth/profile     - Update profile
```

### Journal
```
POST   /api/journal          - Create journal entry
GET    /api/journal          - Get all journals (paginated)
GET    /api/journal/:id      - Get specific journal
PUT    /api/journal/:id      - Update journal
DELETE /api/journal/:id      - Delete journal
GET    /api/journal/stats    - Get statistics
```

### Habits
```
POST   /api/habits           - Create habit
GET    /api/habits           - Get all habits
PUT    /api/habits/:id       - Update habit
DELETE /api/habits/:id       - Delete habit
POST   /api/habits/:id/complete - Mark habit complete
GET    /api/habits/stats     - Get habit stats
```

### Mood, Sleep, Analytics
- See `server/README.md` for complete API documentation

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts
- `journals` - Journal entries with mood tracking
- `habits` - User habits
- `habit_completions` - Habit completion records
- `moods` - Mood log entries
- `sleep_sessions` - Sleep tracking data
- `soundscape_plays` - Soundscape history
- `reflections` - Reflection entries

## 🔐 Environment Variables

### Backend (.env in /server)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/aura_db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:3001/api
```

## 🧪 Testing the Integration

1. **Register a new account**
   - Open `http://localhost:5173`
   - Click "Register"
   - Enter email, password, and name

2. **Complete onboarding**
   - Follow the onboarding flow
   - Select initial mood

3. **Test each feature**
   - Create journal entries
   - Add and complete habits
   - Log moods
   - View analytics dashboard
   - All data persists in PostgreSQL

## 📊 Database Management

### Prisma Studio (Database GUI)
```bash
cd server
npm run prisma:studio
```
Opens at `http://localhost:5555`

### View Database
```bash
# Connect to PostgreSQL
psql -U aura -d aura_db

# List tables
\dt

# View users
SELECT * FROM users;
```

## 🚨 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run migrations: `npm run prisma:migrate`

### Frontend can't connect to backend
- Verify VITE_API_URL in .env
- Check backend is running on port 3001
- Check browser console for CORS errors

### Docker issues
- Check Docker daemon is running
- Remove old containers: `docker-compose down -v`
- Rebuild: `docker-compose up --build`

## 🔄 Data Migration

If you have existing localStorage data, it will be preserved during the first login, but new data will be stored in the database.

## 📝 Development Workflow

1. Make backend changes in `/server`
2. Backend auto-reloads with `npm run dev`
3. Make frontend changes in `/src`
4. Frontend auto-reloads with Vite HMR
5. Test integration between frontend and backend
6. Commit changes

## 🚀 Production Deployment

### Recommended: Platform as a Service (PaaS)

**Heroku/Railway/Render:**
1. Push code to GitHub
2. Connect repo to platform
3. Set environment variables
4. Deploy automatically

**Vercel (Frontend) + Railway (Backend):**
1. Deploy frontend to Vercel
2. Deploy backend to Railway
3. Update VITE_API_URL to Railway URL

### VPS/Cloud Deployment
1. Build Docker image
2. Push to container registry
3. Deploy to cloud provider (AWS, GCP, Azure)
4. Configure load balancer and SSL

## 📈 Monitoring

- Backend health check: `http://localhost:3001/api/health`
- Frontend: `http://localhost:5173`
- Database: Prisma Studio at `http://localhost:5555`

## 🔒 Security Notes

⚠️ **Before Production:**
- Change JWT_SECRET to a strong random string
- Use environment variables for all secrets
- Enable HTTPS
- Configure proper CORS origins
- Implement rate limiting
- Add input validation and sanitization
- Regular security updates

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com)
- [React Documentation](https://react.dev)
- [PostgreSQL Manual](https://www.postgresql.org/docs/)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs: `docker-compose logs`
3. Check browser console for frontend errors
4. Review API responses in Network tab

---

**Happy Building! 🌟**
