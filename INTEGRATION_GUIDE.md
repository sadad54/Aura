# 🎯 Aura Backend & Frontend Integration - Setup Guide

## 📋 What's Been Implemented

### ✅ Backend Infrastructure (Complete)
1. **Express.js TypeScript Server** - Modular architecture with controllers, routes, middleware
2. **PostgreSQL Database** - Prisma ORM with comprehensive schema
3. **Authentication System** - JWT-based auth with bcrypt password hashing
4. **RESTful API Endpoints** - Complete CRUD operations for all features
5. **Data Models** - Users, Journals, Habits, Moods, Sleep, Soundscapes, Reflections

### ✅ Frontend Integration (Partially Complete)
1. **API Client Service** - Axios-based service layer with error handling
2. **Authentication UI** - Login/Register screen with glassmorphic design
3. **App.tsx Updates** - Integrated auth flow before onboarding
4. **Environment Configuration** - .env setup for API URL

### 🔄 Screens Ready for Integration (Need Implementation)
These screens have UI but still use localStorage. They need to be connected to the API:
1. **Journal Screen** (`AdvancedJournalScreen.tsx`)
2. **Habit Tracker** (`HabitTrackerScreen.tsx`)
3. **Analytics Dashboard** (`AnalyticsDashboard.tsx`)
4. **Sleep Coach** (`SleepCoachScreen.tsx`)
5. **Reflection Screen** (`ReflectionScreen.tsx`)

## 🚀 Getting Started

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd ..
npm install
```

### Step 2: Setup PostgreSQL

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL (Windows)
# Download from: https://www.postgresql.org/download/windows/

# Create database
psql -U postgres
CREATE DATABASE aura_db;
\q
```

**Option B: Docker PostgreSQL**
```bash
docker run --name aura-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=aura_db -p 5432:5432 -d postgres:16
```

### Step 3: Configure Environment

**Backend (.env in /server):**
```env
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aura_db?schema=public"
JWT_SECRET="your-super-secret-key-change-this"
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env in root):**
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 4: Initialize Database

```bash
cd server
npm run prisma:generate
npm run prisma:migrate
```

### Step 5: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Step 6: Test the Application

1. Open http://localhost:5173
2. Register a new account
3. Complete onboarding
4. Explore the app!

## 📁 Project Structure

```
Aura/
├── src/                          # Frontend
│   ├── components/
│   │   ├── AuthScreen.tsx       # ✅ NEW: Login/Register
│   │   ├── OnboardingFlow.tsx   # Existing
│   │   ├── EnhancedHomeScreen.tsx
│   │   ├── AdvancedJournalScreen.tsx    # ⚠️ Needs API integration
│   │   ├── HabitTrackerScreen.tsx       # ⚠️ Needs API integration
│   │   ├── AnalyticsDashboard.tsx       # ⚠️ Needs API integration
│   │   ├── SleepCoachScreen.tsx         # ⚠️ Needs API integration
│   │   └── ReflectionScreen.tsx         # ⚠️ Needs API integration
│   ├── services/
│   │   └── api.ts                # ✅ NEW: API client with all methods
│   └── App.tsx                   # ✅ UPDATED: Auth flow integrated
│
├── server/                       # ✅ NEW: Complete backend
│   ├── src/
│   │   ├── controllers/         # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth middleware
│   │   └── server.ts            # Main server
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   └── package.json
│
├── docker-compose.yml            # ✅ NEW: Docker orchestration
├── Dockerfile                    # ✅ NEW: Container definition
├── DEPLOYMENT.md                 # ✅ NEW: Deployment guide
└── README.md                     # ✅ UPDATED: Complete documentation
```

## 🔌 API Integration Examples

### Example: Integrating Journal Screen

**Current (localStorage):**
```typescript
localStorage.setItem('aura_journals', JSON.stringify(entries));
```

**New (API):**
```typescript
import { apiClient } from '../services/api';

// Create journal entry
const journal = await apiClient.createJournal({
  title: 'My Entry',
  content: 'Content here...',
  mood: 'happy',
  moodIntensity: 8,
  tags: ['gratitude']
});

// Get all journals
const { journals } = await apiClient.getJournals({ page: 1, limit: 20 });
```

### Example: Integrating Habit Tracker

**Current (localStorage):**
```typescript
const habits = JSON.parse(localStorage.getItem('aura_habits') || '[]');
```

**New (API):**
```typescript
import { apiClient } from '../services/api';

// Get habits with completions
const habits = await apiClient.getHabits();

// Complete a habit
await apiClient.completeHabit(habitId, 'Completed today!');

// Get habit stats
const stats = await apiClient.getHabitStats();
```

## 🎨 Screen-by-Screen Integration Plan

### Phase 1: Critical Features ⭐
1. **Journal Screen** - Most used feature
2. **Habit Tracker** - Core functionality
3. **Analytics Dashboard** - Shows aggregated data

### Phase 2: Supporting Features
4. **Sleep Coach** - Important for wellness tracking
5. **Reflection Screen** - Emotional journey
6. **Soundscape Screen** - Usage tracking

## 🔧 Common Integration Patterns

### 1. Loading States
```typescript
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await apiClient.getJournals();
      setData(result.journals);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### 2. Error Handling
```typescript
try {
  await apiClient.createJournal(data);
  toast.success('Journal entry saved!');
} catch (error: any) {
  toast.error(error.response?.data?.error || 'Failed to save');
}
```

### 3. Optimistic Updates
```typescript
// Update UI immediately
setHabits(prev => prev.map(h => 
  h.id === habitId ? { ...h, completedToday: true } : h
));

// Sync with backend
try {
  await apiClient.completeHabit(habitId);
} catch (error) {
  // Revert on error
  setHabits(prev => prev.map(h => 
    h.id === habitId ? { ...h, completedToday: false } : h
  ));
}
```

## 📊 Database Schema Reference

```sql
-- Users
users (id, email, password, name, createdAt, updatedAt)

-- Journal
journals (id, userId, title, content, mood, moodIntensity, tags, wordCount, createdAt)

-- Habits
habits (id, userId, title, icon, gradient, category, timeOfDay, isActive)
habit_completions (id, userId, habitId, completedAt, note)

-- Mood Tracking
moods (id, userId, mood, intensity, note, triggers, createdAt)

-- Sleep
sleep_sessions (id, userId, bedTime, wakeTime, duration, quality, deepSleep, remSleep, lightSleep)

-- Reflections
reflections (id, userId, title, content, mood, intensity, tags, peaceScore)

-- Soundscapes
soundscape_plays (id, userId, soundscape, duration, volume, playedAt)
```

## 🧪 Testing Checklist

### Backend Testing
- [ ] Health check endpoint responds
- [ ] Register new user
- [ ] Login with credentials
- [ ] Create journal entry
- [ ] Create habit
- [ ] Complete habit
- [ ] Log mood
- [ ] Get analytics

### Frontend Testing
- [ ] Registration form validation
- [ ] Login form validation
- [ ] Onboarding flow
- [ ] Navigate between screens
- [ ] Create journal entry (after integration)
- [ ] Track habit (after integration)
- [ ] View analytics (after integration)

### Integration Testing
- [ ] Data persists after logout/login
- [ ] Token refresh works
- [ ] Error messages display properly
- [ ] Loading states work correctly

## 🚨 Troubleshooting

### "Cannot connect to database"
```bash
# Check PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Verify DATABASE_URL in .env
# Make sure port 5432 is not blocked
```

### "CORS error in browser"
```bash
# Check CORS_ORIGIN in server/.env matches frontend URL
# Default: http://localhost:5173
```

### "Module not found: axios"
```bash
# Install axios in frontend
npm install axios
```

### "Prisma Client not generated"
```bash
cd server
npm run prisma:generate
```

## 🎯 Next Steps

1. **Test the current setup:**
   - Register and login
   - Complete onboarding
   - Verify auth flow works

2. **Integrate one screen at a time:**
   - Start with Journal (most straightforward)
   - Then Habits (moderate complexity)
   - Then Analytics (uses aggregated data)

3. **Test each integration:**
   - Create data
   - View data
   - Update data
   - Delete data

4. **Deploy for demo:**
   - Use Docker Compose for quick deployment
   - Or deploy to Railway/Render for cloud hosting

## 📚 Additional Resources

- **API Documentation**: `server/README.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Prisma Docs**: https://www.prisma.io/docs
- **Express Docs**: https://expressjs.com

## 🤝 Need Help?

1. Check the API health endpoint: `http://localhost:3001/api/health`
2. View server logs in terminal
3. Check browser console for frontend errors
4. Review Prisma Studio: `cd server && npm run prisma:studio`

---

**You now have a fully functional backend and authentication system! The remaining work is connecting the existing UI screens to the API endpoints. Each screen integration should take 30-60 minutes.** 🚀
