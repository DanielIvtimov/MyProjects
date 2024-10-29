import express from "express";
import cors from "cors";
import { sequelize } from "./database/db_connection.js";
import taskRouter from "./router/router_taskTimer.js";
import taskCalendarRouter from "./router/router_taskCalendar.js";
import reminderRouter from "./router/router_Reminders.js";

const server = express();
const PORT = 3000;
const HOST = 'localhost';

server.use(cors());
server.use(express.json());

server.use(taskRouter);
server.use(taskCalendarRouter);
server.use(reminderRouter);

server.listen(PORT, HOST, async () => {
    console.log(`Server is up and running on port: ${PORT}, and host: ${HOST}`);    
    try{
       await sequelize.authenticate();
       console.log('Connection to the database has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }
})

