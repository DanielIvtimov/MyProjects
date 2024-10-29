import { Router } from "express";
import { TaskCalendarController} from "../controller/taskCalendarController.js"

const taskCalendarRouter = Router();
const taskCalendarController = new TaskCalendarController();

taskCalendarRouter.post('/web/calendar', (request, response) => {
    taskCalendarController.createCalendarTask(request, response);
})

taskCalendarRouter.get('/web/calendar', (request, response) => {
    taskCalendarController.getAllCalendarTasks(request, response)
})

taskCalendarRouter.delete('/web/calendar/:id', (request, response) => {
    taskCalendarController.deleteCalendarTask(request, response);
})

export default taskCalendarRouter;