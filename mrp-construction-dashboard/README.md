# MRP Construction Dashboard

A professional **Material Requirement Planning (MRP) Dashboard** for construction projects — built with React, Node.js, Express, and MongoDB.

## 🏗️ Features

- **KPI Cards** — Total Materials Required, In Stock, Ordered, Shortage
- **Demand vs Availability Chart** — Bar chart comparing required vs available stock
- **Material Consumption Chart** — Pie chart showing used vs remaining %
- **Procurement Status** — Progress bars with delivery tracking
- **Cost Analysis Chart** — Column chart with cost distribution
- **Materials Data Table** — Sortable, filterable table with all material details
- **Real Backend API** — Node.js/Express with MongoDB persistence
- **Demo Mode** — Falls back to static demo data when API is unavailable

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
cd mrp-construction-dashboard
docker-compose up --build
```

Then access:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### Option 2: Manual Setup

#### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI
npm install
npm run seed     # Seed sample data
npm run dev      # Start development server
```

#### Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env with your API URL
npm install
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | API health check |
| GET | `/api/materials` | Get all materials |
| POST | `/api/materials` | Create material |
| PUT | `/api/materials/:id` | Update material |
| DELETE | `/api/materials/:id` | Delete material |
| GET | `/api/dashboard/kpis` | KPI metrics |
| GET | `/api/dashboard/demand-vs-availability` | Demand chart data |
| GET | `/api/dashboard/consumption` | Consumption data |
| GET | `/api/dashboard/cost-analysis` | Cost analysis data |
| GET | `/api/dashboard/procurement-status` | Procurement progress |

## 🏛️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Material-UI v5, Recharts |
| Backend | Node.js, Express.js, TypeScript |
| Database | MongoDB with Mongoose ODM |
| Deployment | Docker, Docker Compose |

## 📦 Sample Data

Pre-seeded construction materials:

| Material | Required | Available | Ordered | Unit Cost |
|----------|----------|-----------|---------|-----------|
| Cement | 50,000 | 30,000 | 15,000 | $8.50/bag |
| Steel | 10,000 | 6,000 | 3,000 | $75.00/kg |
| Sand | 80,000 | 50,000 | 25,000 | $2.50/m³ |
| Bricks | 100,000 | 60,000 | 35,000 | $0.45/unit |
| Aggregate | 40,000 | 25,000 | 12,000 | $12.00/ton |

## 📁 Project Structure

```
mrp-construction-dashboard/
├── frontend/               # React TypeScript application
│   ├── src/
│   │   ├── components/     # Dashboard, KPICards, Charts, Table
│   │   ├── services/       # Axios API client
│   │   └── types/          # TypeScript interfaces
│   └── package.json
├── backend/                # Node.js Express API
│   ├── src/
│   │   ├── models/         # Mongoose Material model
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Error handler
│   │   └── config/         # Database connection
│   └── package.json
├── docker-compose.yml      # Full stack deployment
└── README.md
```

## 📄 License

MIT
