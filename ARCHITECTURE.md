# 🏛️ Aura Architecture Overview

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         AURA APPLICATION                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐         ┌──────────────────────────┐
│      FRONTEND (React)     │         │   BACKEND (Express.js)    │
│    Port: 5173 (Vite)     │◄───────►│      Port: 3001          │
└──────────────────────────┘   HTTP   └──────────────────────────┘
                                REST              │
                                                 │ Prisma ORM
                                                 ▼
                                      ┌──────────────────────────┐
                                      │  PostgreSQL Database     │
                                      │     Port: 5432           │
                                      └──────────────────────────┘
```

## Frontend Architecture

```
src/
├── App.tsx                          # Main app component
│   ├── AuthScreen                   # Login/Register
│   ├── OnboardingFlow              # First-time user setup
│   └── Main App Screens
│       ├── EnhancedHomeScreen      # Dashboard
│       ├── AdvancedJournalScreen   # Journaling
│       ├── HabitTrackerScreen      # Habits
│       ├── AnalyticsDashboard      # Analytics
│       ├── SleepCoachScreen        # Sleep
│       ├── ReflectionScreen        # Reflections
│       ├── SoundscapeScreen        # Audio
│       └── MentalWellnessToolkit   # Wellness tools
│
├── services/
│   └── api.ts                       # API Client Layer
│       ├── Authentication methods
│       ├── Journal methods
│       ├── Habit methods
│       ├── Mood methods
│       ├── Sleep methods
│       └── Analytics methods
│
└── components/
    ├── ui/                          # Radix UI components
    └── ui-library/                  # Custom components
```

## Backend Architecture

```
server/
├── src/
│   ├── server.ts                    # Express app entry point
│   │
│   ├── routes/                      # API Routes (URL → Controller)
│   │   ├── auth.routes.ts          # /api/auth/*
│   │   ├── journal.routes.ts       # /api/journal/*
│   │   ├── habit.routes.ts         # /api/habits/*
│   │   ├── mood.routes.ts          # /api/moods/*
│   │   ├── sleep.routes.ts         # /api/sleep/*
│   │   ├── soundscape.routes.ts    # /api/soundscapes/*
│   │   ├── reflection.routes.ts    # /api/reflections/*
│   │   └── analytics.routes.ts     # /api/analytics/*
│   │
│   ├── controllers/                 # Business Logic
│   │   ├── auth.controller.ts      # Authentication logic
│   │   ├── journal.controller.ts   # Journal CRUD
│   │   ├── habit.controller.ts     # Habit tracking
│   │   ├── mood.controller.ts      # Mood logging
│   │   ├── sleep.controller.ts     # Sleep tracking
│   │   ├── soundscape.controller.ts # Soundscape logs
│   │   ├── reflection.controller.ts # Reflections
│   │   └── analytics.controller.ts # Data aggregation
│   │
│   └── middleware/
│       └── auth.middleware.ts       # JWT verification
│
└── prisma/
    └── schema.prisma                # Database schema
```

## Database Schema

```
┌────────────────────────────────────────────────────────────┐
│                     DATABASE SCHEMA                         │
└────────────────────────────────────────────────────────────┘

┌─────────────┐
│    users    │  (id, email, password, name)
└──────┬──────┘
       │ one-to-many relationships
       ├──────────────────────────────────────────┐
       │                                           │
       ▼                                           ▼
┌─────────────┐                            ┌─────────────┐
│  journals   │                            │   habits    │
│             │                            │             │
│ - userId    │                            │ - userId    │
│ - content   │                            │ - title     │
│ - mood      │                            │ - category  │
│ - intensity │                            │ - icon      │
└─────────────┘                            └──────┬──────┘
                                                  │
                                                  │ one-to-many
                                                  ▼
                                           ┌───────────────────┐
                                           │ habit_completions │
                                           │ - habitId         │
                                           │ - completedAt     │
                                           └───────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────────┐
│    moods    │    │sleep_sessions│   │soundscape_plays │
│             │    │              │    │                 │
│ - userId    │    │ - userId     │    │ - userId        │
│ - mood      │    │ - bedTime    │    │ - soundscape    │
│ - intensity │    │ - wakeTime   │    │ - duration      │
└─────────────┘    │ - quality    │    └─────────────────┘
                   └─────────────┘

                   ┌─────────────┐
                   │ reflections │
                   │             │
                   │ - userId    │
                   │ - content   │
                   │ - peaceScore│
                   └─────────────┘
```

## Authentication Flow

```
1. User Registration/Login
   ┌──────┐
   │ User │
   └───┬──┘
       │ POST /api/auth/register or /api/auth/login
       │ { email, password, name }
       ▼
   ┌────────────────┐
   │ Auth Controller│
   └───┬───────────┘
       │ 1. Hash password (bcrypt)
       │ 2. Create/verify user in DB
       │ 3. Generate JWT token
       ▼
   ┌──────────────┐
   │ JWT Token    │ ──► Stored in localStorage
   └──────────────┘

2. Protected API Requests
   ┌──────┐
   │ User │
   └───┬──┘
       │ GET /api/journal (+ Bearer token in header)
       ▼
   ┌───────────────┐
   │Auth Middleware│ ──► Verify token
   └───┬───────────┘
       │ Token valid?
       ├─ Yes ──► Continue to controller
       └─ No ──► 401 Unauthorized

3. API Response
   ┌──────────────┐
   │  Controller  │
   └───┬──────────┘
       │ Query database
       │ Process data
       ▼
   ┌──────────────┐
   │ JSON Response│ ──► Return to frontend
   └──────────────┘
```

## Data Flow Example: Creating a Journal Entry

```
┌──────────────────────────────────────────────────────────────┐
│ 1. USER INTERACTION                                          │
└──────────────────────────────────────────────────────────────┘
   User writes journal entry in AdvancedJournalScreen
   Clicks "Save"
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. FRONTEND API CALL                                         │
└──────────────────────────────────────────────────────────────┘
   apiClient.createJournal({
     title: "My Day",
     content: "Today was amazing...",
     mood: "happy",
     moodIntensity: 8,
     tags: ["gratitude"]
   })
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 3. HTTP REQUEST                                              │
└──────────────────────────────────────────────────────────────┘
   POST http://localhost:3001/api/journal
   Headers: { Authorization: "Bearer <jwt-token>" }
   Body: { title, content, mood, moodIntensity, tags }
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 4. BACKEND AUTHENTICATION                                    │
└──────────────────────────────────────────────────────────────┘
   auth.middleware.ts
   ├─ Extract token from header
   ├─ Verify JWT signature
   ├─ Extract userId from token
   └─ Attach userId to request
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. ROUTE HANDLER                                             │
└──────────────────────────────────────────────────────────────┘
   journal.routes.ts
   Route: POST /api/journal → journalController.createJournal
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. CONTROLLER LOGIC                                          │
└──────────────────────────────────────────────────────────────┘
   journal.controller.ts
   ├─ Calculate word count
   ├─ Validate data
   ├─ Create journal entry via Prisma
   └─ Create mood entry (side effect)
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 7. DATABASE OPERATION                                        │
└──────────────────────────────────────────────────────────────┘
   Prisma ORM
   ├─ INSERT INTO journals (userId, title, content...)
   ├─ INSERT INTO moods (userId, mood, intensity...)
   └─ COMMIT transaction
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 8. RESPONSE                                                  │
└──────────────────────────────────────────────────────────────┘
   200 OK
   {
     message: "Journal entry created successfully",
     journal: { id: "uuid", title: "My Day", ... }
   }
              │
              ▼
┌──────────────────────────────────────────────────────────────┐
│ 9. FRONTEND UPDATE                                           │
└──────────────────────────────────────────────────────────────┘
   ├─ Update UI state
   ├─ Show success message
   └─ Redirect or refresh list
```

## API Endpoint Structure

```
/api
├── /auth
│   ├── POST   /register          → Create new user
│   ├── POST   /login             → Authenticate user
│   ├── GET    /profile           → Get user profile
│   └── PUT    /profile           → Update profile
│
├── /journal
│   ├── POST   /                  → Create entry
│   ├── GET    /                  → Get all (paginated)
│   ├── GET    /stats             → Get statistics
│   ├── GET    /:id               → Get specific entry
│   ├── PUT    /:id               → Update entry
│   └── DELETE /:id               → Delete entry
│
├── /habits
│   ├── POST   /                  → Create habit
│   ├── GET    /                  → Get all habits
│   ├── GET    /stats             → Get statistics
│   ├── GET    /:id               → Get completions
│   ├── PUT    /:id               → Update habit
│   ├── DELETE /:id               → Archive habit
│   └── POST   /:id/complete      → Mark complete
│
├── /moods
│   ├── POST   /                  → Log mood
│   ├── GET    /                  → Get history
│   └── GET    /stats             → Get statistics
│
├── /sleep
│   ├── POST   /                  → Create session
│   ├── GET    /                  → Get sessions
│   ├── PUT    /:id               → Update session
│   └── GET    /stats             → Get statistics
│
├── /soundscapes
│   ├── POST   /                  → Log playback
│   └── GET    /history           → Get history
│
├── /reflections
│   ├── POST   /                  → Create reflection
│   ├── GET    /                  → Get reflections
│   └── GET    /timeline          → Get timeline
│
└── /analytics
    ├── GET    /dashboard         → Dashboard data
    └── GET    /detailed          → Detailed analytics
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    REQUEST FLOW                         │
└─────────────────────────────────────────────────────────┘

1. CORS Protection
   ├─ Only allow requests from configured origin
   └─ Block unauthorized domains

2. JWT Verification
   ├─ Verify token signature
   ├─ Check expiration
   └─ Extract user identity

3. Input Validation
   ├─ express-validator
   ├─ Type checking
   └─ Sanitization

4. Database Security
   ├─ Prisma ORM (SQL injection prevention)
   ├─ Prepared statements
   └─ Input sanitization

5. Password Security
   ├─ bcrypt hashing
   ├─ Salt rounds: 10
   └─ Never store plain text

6. Environment Variables
   ├─ Secrets in .env
   ├─ Not committed to git
   └─ Different per environment
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────┐
│              DOCKER COMPOSE STACK                     │
└──────────────────────────────────────────────────────┘

┌────────────────────┐
│  aura-postgres     │  PostgreSQL Container
│  Port: 5432        │  ├─ Database: aura_db
│                    │  └─ Persistent volume
└────────────────────┘
         │
         │ Internal network: aura-network
         ▼
┌────────────────────┐
│    aura-app        │  Application Container
│  Ports: 3001,5173  │  ├─ Backend (Node.js)
│                    │  ├─ Frontend (Vite build)
│                    │  └─ Health checks
└────────────────────┘
         │
         │ External access
         ▼
┌────────────────────┐
│   Load Balancer    │  (Optional for production)
│   SSL/TLS          │
└────────────────────┘
```

## Technology Stack

```
┌─────────────────────────────────────────┐
│           FRONTEND STACK                │
└─────────────────────────────────────────┘
├─ React 18          → UI framework
├─ TypeScript        → Type safety
├─ Vite             → Build tool
├─ Framer Motion    → Animations
├─ Tailwind CSS     → Styling
├─ Radix UI         → Component primitives
├─ Axios            → HTTP client
└─ Recharts         → Data visualization

┌─────────────────────────────────────────┐
│            BACKEND STACK                │
└─────────────────────────────────────────┘
├─ Node.js          → Runtime
├─ Express.js       → Web framework
├─ TypeScript       → Type safety
├─ Prisma           → ORM
├─ PostgreSQL       → Database
├─ JWT              → Authentication
├─ bcrypt           → Password hashing
└─ express-validator→ Input validation

┌─────────────────────────────────────────┐
│             DEVOPS STACK                │
└─────────────────────────────────────────┘
├─ Docker           → Containerization
├─ Docker Compose   → Orchestration
├─ Git              → Version control
└─ VS Code          → Development environment
```

---

**This architecture provides a solid foundation for a scalable, maintainable, and secure wellness application! 🚀**
