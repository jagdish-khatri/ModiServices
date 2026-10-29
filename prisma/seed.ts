/**
 * Prisma seed script — creates the initial admin user.
 *
 * Usage:
 *   npx ts-node --compiler-options '{"module":"commonjs"}' prisma/seed.ts
 * Or add to package.json prisma.seed and run:
 *   npx prisma db seed
 *
 * Change ADMIN_USERNAME and ADMIN_PASSWORD before running in production!
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "ChangeMe@123";

async function main() {
  console.log("🌱 Seeding database...");

  // Check if admin already exists
  const existing = await prisma.adminUser.findUnique({
    where: { username: ADMIN_USERNAME },
  });

  if (existing) {
    console.log(`✓ Admin user "${ADMIN_USERNAME}" already exists. Skipping.`);
    console.log("  To reset the password, delete the user from the database and re-run this script.");
    return;
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const admin = await prisma.adminUser.create({
    data: {
      username: ADMIN_USERNAME,
      passwordHash,
    },
  });

  console.log(`✅ Admin user created:`);
  console.log(`   Username: ${admin.username}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);
  console.log(`\n⚠️  IMPORTANT: Change the admin password before going live!`);
  console.log(`   You can set SEED_ADMIN_USERNAME and SEED_ADMIN_PASSWORD env vars to customise.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
