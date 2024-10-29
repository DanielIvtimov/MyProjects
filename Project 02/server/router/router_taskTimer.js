import { response, Router } from "express"
import { TaskTimerController } from "../controller/taskTimerController.js"

const taskRouter = Router();
const taskController = new TaskTimerController();

taskRouter.post('/web/home', (request, response) => {
    taskController.createTasks(request, response);
})

taskRouter.get('/web/home', (request, response) => {
    taskController.getAllTasks(request, response);
})

taskRouter.delete('/web/home/:id', (request, response) => {
    taskController.deleteTaskById(request, response);
})

taskRouter.put('/web/home/:id', (request, response) => {
    taskController.updateTask(request, response);
})

export default taskRouter;