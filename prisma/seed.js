import "dotenv/config";
import pkg from "@prisma/client";
import { hashPassword } from "../src/utils/hash.js";

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingAdmin) {
    const hashedPassword = await hashPassword("admin123"); 

    await prisma.user.create({
      data: {
        email: "admin@gmail.com",
        name: "Admin",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user berhasil ditambahkan!");
  } else {
    console.log("Admin user sudah ada, skip seed.");
  }
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
