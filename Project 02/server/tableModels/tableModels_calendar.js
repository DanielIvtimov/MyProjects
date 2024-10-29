import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db_connection.js";

export class TaskCalendarTable extends Model {}

TaskCalendarTable.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,  
    modelName: 'TaskCalendarTable',  
    timestamps: true  
});

(async () => {
    try {
        await sequelize.sync();  
        console.log("Calendar task model synced with the database.");
    } catch (error) {
        console.error("Error syncing the Calendar task with the database:", error);
    }
})();

