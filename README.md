# 🎬 Movie Facts App

A full-stack Next.js + Postgres application that generates quirky, spoiler-free movie facts using AI (OpenAI with Groq fallback).

---

## 🚀 Features
- Next.js 14 (App Router)
- Authentication with NextAuth
- PostgreSQL + Prisma ORM
- Dockerized app and database
- OpenAI API for trivia generation (with Hugging Face fallback)
- CI/CD ready

---

## 🛠 Prerequisites
- [Docker](https://docs.docker.com/get-docker/) installed
- API keys:
  - [OpenAI API Key](https://platform.openai.com/api-keys)
  - [Groq API Key](https://console.groq.com/keys)

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
# Database connection
DATABASE_URL="postgresql://postgres:mysecretpassword@movie-postgres:5432/movie_facts?schema=public"

# API Keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx

# Auth secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your_nextauth_secret
```

---

## 🐳 Running with Docker (Step by Step)

### 1. Stop & Remove Old Containers
```bash
docker ps -a
docker stop movie-postgres movie-app
docker rm movie-postgres movie-app
```

### 2. Create Docker Network
```bash
docker network create movie-network
```

### 3. Start Postgres
```bash
docker run --name movie-postgres \
  --network movie-network \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=movie_facts \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Build & Run App
```bash
docker build -t movie-app .
docker run --name movie-app \
  --network movie-network \
  -p 3000:3000 \
  -d movie-app
```

### 5. Verify Connectivity
```bash
docker exec -it movie-app ping movie-postgres
```

### 6. Run Prisma Migrations
```bash
# Apply migrations
docker exec -it movie-app npx prisma migrate deploy

# Or reset database completely
docker exec -it movie-app npx prisma migrate reset
```

### 7. Check Database Tables
```bash
docker exec -it movie-postgres psql -U postgres -d movie_facts
```
Inside psql:
```
\dt
```

### 8. Restart App
```bash
docker restart movie-app
```

---

## 🌐 Access App
The app runs at:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🧪 Development Notes
- To run locally without Docker:
  ```bash
  npm install
  npm run dev
  ```
- Prisma commands:
  ```bash
  npx prisma generate
  npx prisma studio
  ```

---

## ⚡ One-Liner Setup Script

If you want to run everything in one go (from a fresh setup):

```bash
docker stop movie-postgres movie-app
docker rm movie-postgres movie-app
docker network create movie-network || true 
docker run --name movie-postgres --network movie-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=movie_facts -p 5432:5432 -d postgres:15
docker build -t movie-app .
docker run --name movie-app --network movie-network -p 3000:3000 -d movie-app 
docker exec -it movie-app npx prisma migrate deploy
docker restart movie-app
```

---
## Check logs
```
docker logs -f movie-app
```

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

## 📌 Roadmap
- [ ] Add movie search functionality
- [ ] Add user profiles with saved facts
- [ ] Deploy to Vercel with managed Postgres
