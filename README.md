# TODO Platform

Modern full-stack TODO application built with NestJS and React.

## 🏗️ Project Structure
```
todo-platform/
├── backend/          # NestJS API server
├── frontend/         # React application  
├── README.md         # Project documentation
└── .gitignore        # Git ignore rules
```

## Tech Stack
- **Backend:** NestJS (TypeScript)
- **Frontend:** React + Redux + TypeScript  
- **Database:** SQLite with TypeORM
- **Documentation:** OpenAPI/Swagger
- **Deployment:** Docker

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
yarn install
yarn build
yarn start
```

The API server runs on `http://localhost:3000`

### API Documentation
Swagger UI is available at: `http://localhost:3000/api-docs`

## 📋 API Endpoints

### Tasks Management
All endpoints are prefixed with `/api/tasks`

#### Get Tasks
```bash
GET /api/tasks/list
```
**Query Parameters:**
- `status` (optional): Filter by task status (`in progress` or `completed`)

**Example:**
```bash
curl "http://localhost:3000/api/tasks/list"
curl "http://localhost:3000/api/tasks/list?status=completed"
```

#### Create Task
```bash
POST /api/tasks/create
```
**Request Body:**
```json
{
  "text": "Buy groceries",
  "status": "in progress"
}
```

**Example:**
```bash
curl -X POST "http://localhost:3000/api/tasks/create" \
  -H "Content-Type: application/json" \
  -d '{"text": "Buy groceries", "status": "in progress"}'
```

#### Update Task Status
```bash
PATCH /api/tasks/update
```
**Request Body:**
```json
{
  "id": 1,
  "status": "completed"
}
```

**Example:**
```bash
curl -X PATCH "http://localhost:3000/api/tasks/update" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "status": "completed"}'
```

#### Delete Task
```bash
DELETE /api/tasks/delete
```
**Request Body:**
```json
{
  "id": 1
}
```

**Example:**
```bash
curl -X DELETE "http://localhost:3000/api/tasks/delete" \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

## 📊 Task Status Values
- `in progress` - Task is being worked on
- `completed` - Task is finished

## �️ Database
- **Type:** SQLite
- **File:** `backend/tasks.db` (auto-generated)
- **ORM:** TypeORM with automatic synchronization

## 🛠️ Development

### Backend Development
```bash
cd backend
yarn start:dev  # Runs with hot reload
```

### Testing the API
Use the included curl commands above or visit the Swagger UI at:
`http://localhost:3000/api-docs`

## 📁 Project Status
✅ **Backend:** Complete
- NestJS API with TypeORM
- SQLite database
- OpenAPI/Swagger documentation
- CORS enabled for frontend integration

🚧 **Frontend:** Coming soon
- React + Redux setup
- TypeScript integration
- Tailwind CSS styling

## 🐳 Docker Deployment
Coming soon...
