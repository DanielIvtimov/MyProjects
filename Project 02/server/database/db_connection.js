import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialectOptions: {
        ssl: false
    }
});

