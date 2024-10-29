import { TaskTimer } from "../tableModels/tableModels_task.js"

export class TaskTimerModel {
    async createTask(taskData){
        try{
            const newTask = new TaskTimer(taskData);
            const savedTask = await newTask.save();
            return savedTask;
        }catch(error){
            console.error(error);
            throw new Error("Failed to create task.");
        }
    }

    async getAllTasks(){
        try{
            const tasks = await TaskTimer.findAll();
            return tasks;
        }catch(error){
            console.error(error);
            throw new Error("Failed to read all tasks");
        }
    }
    async deleteTask(taskId){
        try{
            const deleteTask = await TaskTimer.destroy({
                where: {
                    id: taskId
                }
            });
            if(deleteTask === 0){
                throw new Error("Task not found.");
            }
            return deleteTask;
        }catch(error){
            console.error(error);
            throw new Error("Failed to delete task by ID.");
        }
    }

    async updateTask(taskId, updateTaskData){
        try{
            const updateTask = await TaskTimer.findByIdAndUpdate(taskId, updateTaskData, {new: true});
            return updateTask;
        }catch(error){
            console.error(error);
            throw new Error("Failed to update recipe by ID.");
        }
    }
}