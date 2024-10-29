import joi from "joi";

const taskTimerValidationLogic = joi.object({
    name: joi.string().min(3).required(),
    time: joi.number().integer().positive().required(), 
    remainingTime: joi.number().integer().min(0).required(), 
    elapsedTime: joi.number().integer().min(0).default(0), 
    totalPomodoros: joi.number().integer().min(1).required(), 
    remainingPomodoros: joi.number().integer().min(0).default(0), 
    completionTime: joi.date().allow(null), 
    status: joi.string().valid('deferred', 'in progress', 'completed').default('deferred'), 
    category: joi.string().required()
});

export default taskTimerValidationLogic;