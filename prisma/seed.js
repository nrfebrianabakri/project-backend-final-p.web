import "dotenv/config";
import pkg from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // CLEAN DATA
  console.log("Cleaning old data...");
  await prisma.loan.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // CREATE USER
  console.log("Creating users...");

  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin Library",
      email: "admin@gmail.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const users = await prisma.user.createMany({
    data: [
      { name: "User One", email: "user1@mail.com", password: userPassword },
      { name: "User Two", email: "user2@mail.com", password: userPassword },
      { name: "User Three", email: "user3@mail.com", password: userPassword },
      { name: "User Four", email: "user4@mail.com", password: userPassword },
    ],
  });

  const userList = await prisma.user.findMany({
    where: { role: "USER" },
  });

  // CREATE CATEGORIES
  console.log("Creating categories...");

  await prisma.category.createMany({
    data: [
      { name: "Technology" },
      { name: "Science" },
      { name: "History" },
      { name: "Literature" },
      { name: "Business" },
    ],
  });

  const categories = await prisma.category.findMany();

  // CREAT BOOKS
  console.log("Creating books...");

  await prisma.book.createMany({
    data: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        description: "Best practices for writing clean code",
        categoryId: categories[0].id,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        description: "Software craftsmanship guide",
        categoryId: categories[0].id,
      },
      {
        title: "Brief History of Time",
        author: "Stephen Hawking",
        categoryId: categories[1].id,
      },
      {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        categoryId: categories[2].id,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        categoryId: categories[4].id,
      },
    ],
  });

  const books = await prisma.book.findMany();

  // CREATE LOANS
  console.log("Creating loans...");

  await prisma.loan.createMany({
    data: [
      { userId: userList[0].id, bookId: books[0].id },
      { userId: userList[1].id, bookId: books[1].id },
      { userId: userList[2].id, bookId: books[2].id },
      { userId: userList[3].id, bookId: books[3].id },
    ],
  });

  console.log("Database seeding completed!");
}

main()
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
