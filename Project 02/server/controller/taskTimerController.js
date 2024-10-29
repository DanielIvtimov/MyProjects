import { TaskTimerModel } from "../model/taskTimerModel.js"
import taskTimerValidationLogic from "../miniValidationLogic/taskTimerValidationLogic.js";

export class TaskTimerController{
    constructor(){
        this.TaskTimerModel = new TaskTimerModel();
    }
    async createTasks(request, response){
        try{
            const taskData = request.body;
            console.log(taskData);
            await taskTimerValidationLogic.validateAsync(taskData);
            const savedTask = await this.TaskTimerModel.createTask(taskData);
            response.status(201).send({ message: "Successfully created new task", task: savedTask });
        }catch(error){
            console.error(error);
            return response.status(400).send({ error: "Invalid task data", details: error.details });
        }
    }
    async getAllTasks(request, response){
        try{
            const tasks = await this.TaskTimerModel.getAllTasks();
            response.status(200).send({tasks});
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to read all tasks"});
        }
    }
    async deleteTaskById(request, response){
        try{
           const taskId = request.params.id;
           const deletedTask = await this.TaskTimerModel.deleteTask(taskId);
           if(!deletedTask){
            return response.status(404).send({error: "Task not found."});
           }
           response.status(200).send({ message: "Task successfully deleted" });
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to delete task by id."});
        }
    }

    async updateTask(request, response){
        try{
            const taskId = request.params.id;
            const updatedTaskData = request.body;
            await taskTimerValidationLogic.validateAsync(updatedTaskData);
            const updatedTask = await this.TaskTimerModel.updateTask(taskId, updatedTaskData);
            if(!updatedTask){
                return response.status(500).send({error: "Task not found"});
            }
            response.status(200).send({message: "Task successfully updated", updatedTask});
        }catch(error){
            console.error(error);
            response.status(500).send({error: "Failed to update task by ID."})   
        }
    }
}
