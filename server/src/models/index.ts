import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";
import { UserFactory } from "./user.js";
import { TicketFactory } from "./ticket.js";

const dbName = process.env.DB_NAME || "";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbHost = process.env.DB_HOST || "localhost";
const dbConnectionString =
  process.env.DB_CONNECTION_STRING || process.env.DB_URL;

const sequelize = dbConnectionString
  ? new Sequelize(dbConnectionString, {
      dialect: "postgres",
      dialectOptions: {
        ssl: process.env.DB_ENABLE_SSL === 'true' ? { 
          require: true, 
          rejectUnauthorized: false 
        } : false,
        decimalNumbers: true,
      },
      logging: false,
    })
  : new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Same for parameterized connection
        },
        decimalNumbers: true,
      },
      logging: false,
    });

const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

User.hasMany(Ticket, { foreignKey: "assignedUserId" });
Ticket.belongsTo(User, { foreignKey: "assignedUserId", as: "assignedUser" });

export { sequelize, User, Ticket };
