import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // Cek dulu apakah user admin sudah ada, supaya seed bisa diulang
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: "admin@example.com",
        name: "Admin",
        password: "hashedpassword",
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
