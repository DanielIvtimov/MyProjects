import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db_connection.js";

export class Reminders extends Model {}

Reminders.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true 
    },
}, {
    sequelize,
    modelName: 'Reminders',
    timestamps: true
});

(async () => {
    try {
        await sequelize.sync();  
        console.log("Reminders model synced with the database.");
    } catch (error) {
        console.error("Error syncing the Reminders with the database:", error);
    }
})();
