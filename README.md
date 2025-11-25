# 🌟 Aura - AI Wellness & Meditation App

A comprehensive wellness application with a beautiful glassmorphic UI, intelligent features, and full-stack architecture.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Features
- **Authentication System** - Secure JWT-based authentication with registration and login
- **Onboarding Flow** - Personalized welcome experience with mood selection and breathing exercise
- **Journal Suite** - AI-powered journaling with mood tracking, tags, and word count
- **Habit Tracker** - Build positive habits with streak tracking and completion analytics
- **Mood Analytics** - Visualize emotional patterns and trends over time
- **Sleep Coach** - Track sleep quality, duration, and sleep phases
- **Soundscapes** - Ambient audio environments for meditation and focus
- **Reflection Timeline** - Emotional journey visualization
- **Mental Wellness Toolkit** - Evidence-based tools including panic SOS, breath training, and CBT exercises
- **Analytics Dashboard** - Comprehensive wellness metrics and insights

### 🎨 Design Features
- Premium glassmorphism aesthetics
- Smooth animations and transitions
- Responsive mobile-first design
- Dark theme optimized for wellness
- Micro-interactions for enhanced UX

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom Components
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Client**: Axios

### Backend
- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or pnpm

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd Aura
   npm install
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run prisma:generate
   npm run prisma:migrate
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ..
   cp .env.example .env
   # Edit .env with API URL
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - API Health: http://localhost:3001/api/health

### 🐳 Docker Deployment

```bash
# Start all services (PostgreSQL + App)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📖 API Documentation

See [server/README.md](./server/README.md) for complete API documentation.

**Key endpoints:**
- Authentication: `/api/auth/*`
- Journal: `/api/journal/*`
- Habits: `/api/habits/*`
- Moods: `/api/moods/*`
- Sleep: `/api/sleep/*`
- Analytics: `/api/analytics/*`

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for mental wellness and mindfulness**
