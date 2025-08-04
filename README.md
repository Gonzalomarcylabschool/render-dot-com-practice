# Render Practice Server with PostgreSQL

A practice Express.js server with PostgreSQL database integration, ready for deployment on Render.com.

## Features

- Express.js server with RESTful API
- PostgreSQL database integration using Knex.js
- Environment-based configuration
- Database migrations and seeding
- Health check endpoint
- CRUD operations for items
- Production-ready setup

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database health

### Items API
- `GET /api/items` - Get all items
- `GET /api/items/active` - Get only active items
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Legacy Endpoints
- `GET /` - Serve index.html
- `GET /about` - About page
- `GET /api/hello` - Hello endpoint
- `GET /api/data` - Sample data

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your local database credentials.

4. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE render_practice_dev;
   ```

5. Run database migrations:
   ```bash
   npm run migrate
   ```

6. Seed the database with sample data:
   ```bash
   npm run seed
   ```

7. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:8080`

## Database Management

- `npm run migrate` - Run pending migrations
- `npm run migrate:rollback` - Rollback last migration
- `npm run seed` - Run database seeds
- `npm run db:reset` - Reset database (rollback + migrate + seed)

## Production Deployment on Render

### 1. Create a PostgreSQL Database on Render

1. Go to your Render dashboard
2. Click "New" → "PostgreSQL"
3. Choose a name and region
4. Note down the connection details

### 2. Deploy the Web Service

1. Connect your GitHub repository to Render
2. Create a new "Web Service"
3. Configure the service:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

### 3. Set Environment Variables

In your Render web service settings, add these environment variables:

```
NODE_ENV=production
DB_HOST=your-postgres-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-database-user
DB_PASSWORD=your-database-password
PORT=10000
```

### 4. Run Database Migrations

After deployment, you'll need to run migrations. You can do this by:

1. Adding a build script that runs migrations
2. Or manually running migrations through Render's shell

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment (development/production) | `development` |
| `PORT` | Server port | `8080` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `render_practice_dev` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | `password` |

## Project Structure

```
├── db/
│   ├── connection.js      # Database connection
│   ├── migrations/        # Database migrations
│   └── seeds/            # Database seeds
├── models/
│   └── Item.js           # Item model
├── controllers/
│   └── itemController.js # Item controller
├── routes/
│   └── items.js          # Item routes
├── knexfile.js           # Knex configuration
├── index.js              # Main server file
└── package.json
```

## Testing the API

### Create an Item
```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "A test item", "price": 25.99}'
```

### Get All Items
```bash
curl http://localhost:8080/api/items
```

### Health Check
```bash
curl http://localhost:8080/api/health
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check environment variables are set correctly
- Verify database exists and user has proper permissions

### Migration Issues
- Make sure database exists before running migrations
- Check that user has CREATE TABLE permissions

### Production Issues
- Verify all environment variables are set in Render
- Check Render logs for detailed error messages
- Ensure database is accessible from Render's network