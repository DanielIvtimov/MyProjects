import { TaskCalendarTable } from "../tableModels/tableModels_calendar.js"

export class TaskCalendarModel {
    async createTaskCalendar(taskCalendarData){
        try{
           const newCalendarTask = new TaskCalendarTable(taskCalendarData);
           const savedCalendarTask = await newCalendarTask.save(); 
           return savedCalendarTask;
        }catch(error){
            console.error(error);
            throw new Error("Failed to create calendar task.");
        }
    }

    async getAllCalendarTasks(){
        try{
           const calendarTasks = await TaskCalendarTable.findAll();
           return calendarTasks; 
        }catch(error){
            console.error(error);
            throw new Error("Failed to read all calendar tasks");   
        }
    }

    async deleteCalendarTask(taskCalendarId){
        try{
           const deleteCalendarTask = await TaskCalendarTable.destroy({
            where: {
                id: taskCalendarId
            }
           });
           if(deleteCalendarTask === 0){
                throw new Error("Task not found.");
           }
           return deleteCalendarTask;
        }catch(error){
            console.error(error);
            throw new Error("Failed to delete calendar task by ID.");
        }
    }
}