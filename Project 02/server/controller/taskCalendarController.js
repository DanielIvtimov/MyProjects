import { TaskCalendarModel } from "../model/taskCalendarModel.js"
import taskCalendarValidationLogic from "../miniValidationLogic/taskCalendarValidationLogic.js"

export class TaskCalendarController{
    constructor(){
        this.TaskCalendarModel = new TaskCalendarModel();
    }
    async createCalendarTask(request, response){
        try{
           const taskCalendarData = request.body;
           console.log(taskCalendarData);
           await taskCalendarValidationLogic.validateAsync(taskCalendarData);
           const savedCalendarTask = await this.TaskCalendarModel.createTaskCalendar(taskCalendarData);
           response.status(201).send({message: "Successfully created new task", calendarTask: savedCalendarTask}); 
        }catch(error){
            console.error(error);
            return response.status(400).send({error: "Invalid calendar task data", details: error.details});
        }
    }

    async getAllCalendarTasks(request, response){
        try{
           const calendarTasks = await this.TaskCalendarModel.getAllCalendarTasks();
           response.status(200).send({calendarTasks}); 
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to read all calendar tasks"}); 
        }
    }

    async deleteCalendarTask(request, response){
        try{
           const taskCalendarId = request.params.id;
           const deletedCalendarTask = await this.TaskCalendarModel.deleteCalendarTask(taskCalendarId);
           if(!deletedCalendarTask){
            return response.status(404).send({error: "Task not found."});
           }
           return response.status(200).send({message: "Task successfully deleted"});
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to delete calendar task by id."});
        }
    }
}

