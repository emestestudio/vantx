const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('123456', 10);
  const user = await p.user.update({
    where: { email: 'admin@miempresa.com' },
    data: { password: hash }
  });
  console.log('OK:', user.email, 'Hash:', hash);
  await p.$disconnect();
}

main();