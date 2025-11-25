# Cloud Database Setup Guide

This guide helps you replace the local PostgreSQL database with a cloud-based solution that requires **zero code changes** to your existing architecture.

## Why Cloud Database?

✅ **No Installation Required** - No PostgreSQL, Docker, or local setup needed  
✅ **Always Accessible** - Access your database from anywhere  
✅ **Free Tier Available** - All recommended options have generous free plans  
✅ **Zero Code Changes** - Just update the DATABASE_URL environment variable  
✅ **Better for Demo/Deploy** - Share your app without complex local setup  

---

## Option 1: Supabase (Recommended) ⭐

**Best for:** Quick setup, PostgreSQL features, free tier  
**Free Tier:** 500 MB database, unlimited API requests

### Setup Steps (5 minutes)

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub/Email (free)

2. **Create New Project**
   - Click "New Project"
   - Name: `aura-wellness` (or your choice)
   - Database Password: Choose a strong password (save it!)
   - Region: Select closest to you (e.g., `US East`, `EU West`)
   - Click "Create new project" → Wait ~2 minutes

3. **Get Connection String**
   - Go to **Settings** (⚙️ icon) → **Database**
   - Scroll to **Connection String** section
   - Copy **Connection Pooling** → **URI** (for production)
   - For migrations, copy **Direct Connection** → **URI**

4. **Update Your .env File**
   ```bash
   # In server/.env (create from .env.example if needed)
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

5. **Run Migrations**
   ```bash
   cd server
   npm run prisma:migrate
   ```

6. **Start Your App**
   ```bash
   npm run dev
   ```

**Done! 🎉** Your app now uses Supabase instead of local PostgreSQL.

### Supabase Features You Get
- Built-in database browser (view/edit data in dashboard)
- Real-time subscriptions (if needed later)
- Storage for files (for journal media)
- Authentication (alternative to JWT if you want)

---

## Option 2: Neon

**Best for:** Serverless architecture, auto-scaling  
**Free Tier:** 500 MB storage, 3 GB monthly transfer

### Setup Steps (5 minutes)

1. **Create Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up with GitHub/Email

2. **Create Project**
   - Click "Create Project"
   - Name: `aura-wellness`
   - Region: Choose closest
   - PostgreSQL version: Latest (16)

3. **Get Connection String**
   - After creation, copy the **Connection String** shown
   - It looks like: `postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require`

4. **Update Your .env File**
   ```bash
   DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/neondb?sslmode=require"
   ```

5. **Run Migrations**
   ```bash
   cd server
   npm run prisma:migrate
   ```

**Neon Advantages:**
- Auto-pause when inactive (saves resources)
- Branching (create database copies for testing)
- Very fast cold starts

---

## Option 3: Railway

**Best for:** Simple deployment, all-in-one platform  
**Free Tier:** $5 credit/month (enough for small projects)

### Setup Steps (5 minutes)

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - Click "New Project" → "Deploy PostgreSQL"
   - Wait ~1 minute for deployment

3. **Get Connection String**
   - Click on the PostgreSQL service
   - Go to **Variables** tab
   - Copy the `DATABASE_URL` value

4. **Update Your .env File**
   ```bash
   DATABASE_URL="[paste the Railway DATABASE_URL here]"
   ```

5. **Run Migrations**
   ```bash
   cd server
   npm run prisma:migrate
   ```

**Railway Advantages:**
- Can deploy your entire app (backend + database) in one place
- Simple pricing
- Built-in monitoring

---

## Migration Checklist

After choosing a provider:

- [ ] Create cloud database account
- [ ] Get connection string
- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Update `DATABASE_URL` in `server/.env`
- [ ] Run `npm install` in server folder (if not already done)
- [ ] Run `npm run prisma:migrate` to create tables
- [ ] Run `npm run dev` to start backend
- [ ] Test registration/login in your app

---

## Troubleshooting

### "Can't reach database server"
- Check your internet connection
- Verify the connection string is correct (no extra spaces)
- Make sure you're using the correct URL format (with `?sslmode=require` for Neon)

### "SSL error" with Supabase
For migrations, use the **Direct Connection** URL (port 5432) instead of Connection Pooling (port 6543):
```bash
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
```

### "Connection pool timeout"
You might be using the pooling URL for migrations. Switch to direct connection for migrations, pooling for production.

### Migration takes too long
First migration to cloud can take 30-60 seconds. Be patient!

---

## Comparison Table

| Feature | Supabase | Neon | Railway |
|---------|----------|------|---------|
| **Free Tier** | 500 MB | 500 MB | $5/month credit |
| **Setup Time** | 5 min | 5 min | 5 min |
| **Dashboard** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **Extra Features** | Storage, Auth, Real-time | Branching, Auto-pause | Full app deployment |
| **Best For** | General use, feature-rich | Serverless, efficiency | All-in-one hosting |

---

## Docker Update (Optional)

If you want to keep Docker but use cloud database:

1. Update `docker-compose.yml` - remove the `postgres` service
2. Update `app` service environment to use your cloud `DATABASE_URL`
3. Remove `depends_on: postgres` section

Or simply run backend without Docker:
```bash
cd server
npm run dev
```

---

## Next Steps

After migrating to cloud database:

1. ✅ Your app works exactly the same (no code changes)
2. ✅ You can share your app without users installing PostgreSQL
3. ✅ Deploy to Vercel/Netlify/Railway easier
4. ✅ Access database from anywhere via dashboard

**Ready to deploy?** Check `DEPLOYMENT.md` for deployment instructions.
