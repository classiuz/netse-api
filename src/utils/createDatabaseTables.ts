import pool from '@/config/database'

// This file creates all database tables if they do not exist when called.
// It is important to create the Tables in the following order to use the relationships between them.
// users -> services -> plans, additionals -> coverageAreas -> others

const createCoverageAreasTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`coverageAreas\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(300) NOT NULL UNIQUE,
      \`province\` VARCHAR(100) NOT NULL,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`plansName\` JSON NOT NULL,
      \`additionalsName\` JSON NOT NULL,
      \`location\` JSON NOT NULL,
      \`range\` JSON NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createAdditionalsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`additionals\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`installmentsPrice\` JSON,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createPlansTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`plans\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`download\` INT NOT NULL,
      \`upload\` INT NOT NULL,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`service\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`service\`) REFERENCES \`services\`(\`name\`),
      \`createdBy\` VARCHAR(255) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createClientsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`clients\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`firstName\` VARCHAR(300) NOT NULL,
      \`lastName\` VARCHAR(300) NOT NULL,
      \`document\` INT NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`address\` JSON NOT NULL,
      \`coordinates\` JSON NOT NULL,
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createBlacklistTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`blacklist\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`clientId\` VARCHAR(10) NOT NULL,
      \`reason\` TEXT NOT NULL,
      \`createdBy\` VARCHAR(100) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createServicesTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`services\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`alternativeName\` VARCHAR(100) NOT NULL,
      \`createdBy\` VARCHAR(255) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createTokensTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`tokens\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(100) NOT NULL UNIQUE,
      \`value\` VARCHAR(300) NOT NULL,
      \`createdBy\` VARCHAR(255) NOT NULL,
      FOREIGN KEY (\`createdBy\`) REFERENCES \`users\`(\`username\`),
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`username\` VARCHAR(100) NOT NULL UNIQUE,
      \`email\` VARCHAR(255) NOT NULL,
      \`firstName\` VARCHAR(255) NOT NULL,
      \`lastName\` VARCHAR(255) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`createdAt\` VARCHAR(25) NOT NULL
    )
  `)
}

export default () => {
  void createUsersTable() // Not relation required.

  void createClientsTable() // Not relation required.

  void createServicesTable() // users Table required.

  void createTokensTable() // users Table required.

  void createBlacklistTable() // users Table required.

  void createAdditionalsTable() // services, users Tables required.

  void createPlansTable() // services, users Tables required.

  void createCoverageAreasTable() // services, plans, additionals, users Tables required.
}
