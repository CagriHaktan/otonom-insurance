# Otonom Insurance Management System

Team:
- Cagri Haktan Ozturk (47136)
- Cavit Hakan (46010)

## How to Run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:
```text
http://localhost:5000
```

### 2. Frontend
Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```text
http://localhost:5173
```

### Demo Login
Admin:
- Email: admin@otonom.com
- Password: 123456

Customer:
- Email: customer@otonom.com
- Password: 123456

## Notes
This version uses in-memory sample data so it runs immediately without database setup.
MySQL schema is included in `database/schema.sql` for academic submission.
