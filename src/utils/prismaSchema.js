const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const userTable = prisma.users;
const userLogTokenTable = prisma.user_log_token;


module.exports = {
    prisma,
    userTable,
    userLogTokenTable,
}
