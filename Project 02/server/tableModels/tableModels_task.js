import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db_connection.js";

export class TaskTimer extends Model {}

TaskTimer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remainingTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    elapsedTime: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalPomodoros: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    remainingPomodoros: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    completionTime: {
        type: DataTypes.DATE,
        allowNull: true, 
    },
    status: {
        type: DataTypes.ENUM('deferred', 'in progress', 'completed'),
        defaultValue: 'deferred'
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TaskTimer'
});

(async () => {
    try {
        await sequelize.sync(); 
        console.log("Task model synced with the database.");
    } catch (error) {
        console.error("Error syncing the Task model with the database:", error);
    }
})();
