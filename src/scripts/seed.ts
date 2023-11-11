import { database } from '@/lib/config'
import { SEED_MESSAGES } from '@/lib/messages'

// This script creates all database tables if they do not exist when called.
// It is important to create the Tables in the following order to use the relationships between them.
// users -> services -> plans, additionals -> sales, services-areas -> others

export const seedSales = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`sales\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`firstName\` VARCHAR(250) NOT NULL,
      \`lastName\` VARCHAR(250) NOT NULL,
      \`document\` VARCHAR(15) NOT NULL,
      \`phone\` VARCHAR(15) NOT NULL,
      \`alternativePhone\` VARCHAR(15),
      \`email\` VARCHAR(300),
      \`address\` JSON NOT NULL,
      \`coordinates\` JSON NOT NULL,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`plan\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`plan\`) REFERENCES \`plans\`(\`name\`),
      \`notes\` TEXT,
      \`status\` VARCHAR(100) NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('sales'))
  } catch (error) {
    throw error
  }
}

export const seedServiceAreas = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`services-areas\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(150) NOT NULL UNIQUE,
      \`province\` VARCHAR(100) NOT NULL,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`plans\` JSON NOT NULL,
      \`additionals\` JSON NOT NULL,
      \`location\` JSON NOT NULL,
      \`range\` JSON NOT NULL,
      \`monitoringId\` VARCHAR(100) NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('services-areas'))
  } catch (error) {
    throw error
  }
}

export const seedAdditionals = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`additionals\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`installmentsPrice\` JSON,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('additionals'))
  } catch (error) {
    throw error
  }
}

export const seedPlans = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`plans\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`download\` INT NOT NULL,
      \`upload\` INT NOT NULL,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('plans'))
  } catch (error) {
    throw error
  }
}

export const seedBlacklist = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`blacklist\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`clientId\` VARCHAR(10) NOT NULL,
      \`reason\` TEXT NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('blacklist'))
  } catch (error) {
    throw error
  }
}

export const seedServices = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`services\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`alternativeName\` VARCHAR(100) NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('services'))
  } catch (error) {
    throw error
  }
}

export const seedTokens = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`tokens\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`value\` VARCHAR(300) NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('tokens'))
  } catch (error) {
    throw error
  }
}

export const seedUsers = async () => {
  try {
    await database.query(`
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`username\` VARCHAR(100) NOT NULL UNIQUE,
      \`email\` VARCHAR(255) NOT NULL,
      \`firstName\` VARCHAR(255) NOT NULL,
      \`lastName\` VARCHAR(255) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`createdAt\` DATETIME DEFAULT CURRENT_TIMESTAMP()
    )
  `)
    console.log(SEED_MESSAGES.CREATED('users'))
  } catch (error) {
    throw error
  }
}

const main = async() => {
  await seedUsers()
  await seedServices()
  await seedTokens()
  await seedBlacklist()
  await seedAdditionals()
  await seedPlans()
  await seedSales()
  await seedServiceAreas()
}

try {
  void main()
} catch (error) {
  console.error(
    SEED_MESSAGES.ERROR,
    error
  )
}
