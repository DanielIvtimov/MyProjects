import { RemindersModel } from "../model/remindersModel.js"
import remindersValidationLogic from "../miniValidationLogic/remindersValidationLogic.js"

export class RemindersController {
    constructor(){
        this.RemindersModel = new RemindersModel();
    }

    async createReminder(request, response){
        try{
           const reminderData = request.body;
           console.log(reminderData);
           await remindersValidationLogic.validateAsync(reminderData);
           const savedReminder = await this.RemindersModel.createReminders(reminderData);
           response.status(201).send({message: "Successfully created new reminder.", savedReminder});  
        }catch(error){
            console.error(error);
            return response.status(400).send({error: "Invalid reminder data", details: error.details});
        }
    }

    async getAllReminders(request, response){
        try{
           const reminders = await this.RemindersModel.getAllReminders();
           response.status(200).send({reminders}); 
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to read all reminders."});   
        }
    }

    async deleteReminder(request, response){
        try{
           const reminderId = request.params.id;
           const deletedReminder = await this.RemindersModel.deleteReminders(reminderId);
           if(!deletedReminder){
            return response.status(404).send({error: "Reminder not found."});
           }
           return response.status(200).send({message: "Reminder successfully deleted."});
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to delete reminder by ID."});
        }
    }
}