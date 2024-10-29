import { Router } from "express";
import { RemindersController } from "../controller/remindersController.js"

const remindersRouter = Router();
const remindersController = new RemindersController();

remindersRouter.post('/web/reminders', (request, response) => {
    remindersController.createReminder(request, response);
})

remindersRouter.get('/web/reminders', (request, response) => {
    remindersController.getAllReminders(request, response);
})

remindersRouter.delete('/web/reminders/:id', (request, response) => {
    remindersController.deleteReminder(request, response);
})

export default remindersRouter;