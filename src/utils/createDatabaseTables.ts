import pool from '@/config/database'

// This file creates all database tables if they do not exist when called.
// It is important to create the Tables in the following order to use the relationships between them.
// users -> groups -> others

const createAdditionalsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`additionals\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(300) NOT NULL,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`group\` VARCHAR(255) NOT NULL,
      FOREIGN KEY (\`group\`) REFERENCES \`groups\`(\`name\`)
    )
  `)
}

const createGroupsTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`groups\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(300) NOT NULL UNIQUE,
      \`towers\` VARCHAR(300) NOT NULL
    )
  `)
}

const createPlansTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS \`plans\` (
      \`id\` INT PRIMARY KEY AUTO_INCREMENT,
      \`name\` VARCHAR(300) NOT NULL,
      \`price\` DECIMAL(12, 2) NOT NULL,
      \`group\` VARCHAR(255) NOT NULL,
      FOREIGN KEY (\`group\`) REFERENCES \`groups\`(\`name\`)
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

  void createGroupsTable() // Not relation required.

  void createClientsTable() // Not relation required.

  void createTokensTable() // users Table required.

  void createBlacklistTable() // users Table required.

  void createServicesTable() // users Table required.

  void createAdditionalsTable() // groups Table required.

  void createPlansTable() // groups Table required.
}
