import { Reminders } from "../tableModels/tableModels_reminders.js"

export class RemindersModel {
    async createReminders(remindersData){
        try{
            const newReminder = new Reminders(remindersData);
            const savedReminder = await newReminder.save();
            return savedReminder;
        }catch(error){
            console.error(error);
            throw new Error("Failed to create new reminder.");
        }
    }

    async getAllReminders(){
        try {
            const reminders = await Reminders.findAll();
            return reminders;
        }catch(error){
            console.error(error);
            throw new Error("Failed to read all reminders");   
        }
    }

    async deleteReminders(remindersId){
        try{
           const deleteReminder = await Reminders.destroy({
            where: {
                id: remindersId
            }
           });
           if(deleteReminder === 0){
                throw new Error("Reminder not found.");
           }
           return deleteReminder; 
        }catch(error){
            console.error(error);
            throw new Error("Failed to delete reminder by ID.");   
        }
    }
}