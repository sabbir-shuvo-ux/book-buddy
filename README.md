# BookBuddy

This is a full-stack book listing web application built with Next.js, Prisma ORM, and PostgreSQL. The app allows users to browse, add and filter through a collection of books. It features user authentication using Auth.js (formerly known as NextAuth) for secure login and session management.

## Key Features

- User Authentication: Secure login and session management using Auth.js.
- Database Integration: Prisma ORM to interact with a PostgreSQL - database for seamless data management.
- Book Listings: Users can view, create and filter books by various attributes like title, author, image and etc.
- CRUD Operations: users can add there own book or add existing books in there booklist and delete books.

## Tech Stack

- **Next.js :** React framework for building fast and scalable web apps.
- **Prisma ORM:** Type-safe database access for seamless integration with PostgreSQL.
- **PostgreSQL:** Relational database for storing book and user data.
- **Auth.js:** Authentication library to manage user sessions and security.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **ShadCN UI:** A component library built on top of Tailwind CSS for building beautiful, accessible, and consistent UIs.
- **ImageKit:** Cloud-based image storage and optimization service for efficient media handling and delivery.

## Environment Variables

To run BookBuddy, you will need to add the following environment variables to your .env file

### Auth.js

`AUTH_SECRET=<FOR_AUTH_JS>`

### Imagekit

`NEXT_PUBLIC_PUBLIC_KEY="<YOUR_IMAGEKIT_PUBLIC_KEY>"`
`NEXT_PUBLIC_URL_ENDPOINT="<YOUR_IMAGEKIT_URL_ENDPOINT>"`
`PRIVATE_KEY="<YOUR_IMAGEKIT_PRIVATE_KEY>"`

### DB URL

`DATABASE_URL=<*****************>`

## Run Locally

Clone the project

```bash
  git clone https://github.com/sabbir-shuvo-ux/book-buddy.git
```

Go to the project directory

```bash
  cd ./book-buddy
```

Install dependencies

```bash
  npm install
```

Start the server (Dev Server)

```bash
  npm run dev
```

Start the server

```bash
  npm run build
  npm start
```
