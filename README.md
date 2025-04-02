# Tourism Booking System - Backend API

[![NestJS](https://img.shields.io/badge/NestJS-10.x-red?style=flat&logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-blue?style=flat&logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

RESTful API for the Tourism Booking System built with NestJS and Prisma ORM, providing endpoints for managing tours, bookings, users, and more.

![Tourism Booking API](https://via.placeholder.com/800x400?text=Tourism+Booking+API)

## ✨ Features

- 🔐 JWT authentication
- 👤 User management
- 🌍 Tours and destinations
- 📅 Booking management
- 💸 Payment processing
- ⭐ Reviews and ratings
- 📊 Analytics and reporting
- 📝 Swagger API documentation
- 🗄️ Prisma ORM for database operations

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git
- PostgreSQL/MySQL/MongoDB (depending on your chosen database)

### Installation

1. Clone the repository

```bash
git clone https://github.com/izerekerie/trek-gems-backend.git
cd trek-gems-backend
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Configure environment variables

```bash
# Create a .env file with the following variables
cp .env.example .env
# Edit .env with your configuration
```

4. Generate Prisma client

```bash
npx prisma generate
```

5. Apply database migrations

```bash
npx prisma migrate dev
```

6. Start the development server

```bash
npm run start:dev
# or
yarn start:dev
```

7. Access the API at `http://localhost:3000/api`
8. Access Swagger documentation at `http://localhost:3000/api`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (Prisma)
DATABASE_URL="postgresql://username:password@localhost:5432/tourism_db?schema=public"
# or MySQL: "mysql://username:password@localhost:3306/tourism_db"

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=24h

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email Service
MAIL_HOST=smtp.example.com
MAIL_USER=user@example.com
MAIL_PASSWORD=password
MAIL_FROM=noreply@tourism-booking.com
```

## 📁 Project Structure

```
├── prisma/                      # Prisma configuration
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Migration files
│   └── seed.ts                  # Database seeding
├── src/
│   ├── main.ts                  # Application entry point
│   ├── app.module.ts            # Root module
│   ├── prisma/                  # Prisma service
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── auth/                    # Authentication
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── guards/
│   │   └── strategies/
│   ├── users/                   # User management
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   ├── tours/                   # Tours management
│   │   ├── tours.module.ts
│   │   ├── tours.controller.ts
│   │   ├── tours.service.ts
│   │   └── dto/
│   ├── bookings/                # Booking management
│   │   ├── bookings.module.ts
│   │   ├── bookings.controller.ts
│   │   ├── bookings.service.ts
│   │   └── dto/
│  
│   └── config/                  # Configuration
│       ├── database.config.ts
│       ├── jwt.config.ts
│       └── cloudinary.config.ts
├── test/                        # Test files
├── .env                         # Environment variables (not committed)
├── nest-cli.json                # Nest CLI configuration
└── package.json                 # Project dependencies and scripts
```

## 📝 API Documentation

The API documentation is automatically generated using Swagger. Access it by navigating to:
`http://localhost:3000/api`

## 🔄 Prisma Database Management

```bash
# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name name-of-migration

# Apply pending migrations
npx prisma migrate deploy

# Reset database (CAUTION: This will delete all data)
npx prisma migrate reset

# View and edit data with Prisma Studio
npx prisma studio

# Seed the database
npx prisma db seed
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🚢 Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## 🛠️ Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Passport](https://www.passportjs.org/) - Authentication middleware
- [Swagger](https://swagger.io/) - API documentation
- [Jest](https://jestjs.io/) - Testing framework

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

