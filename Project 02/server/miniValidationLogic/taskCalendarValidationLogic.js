import joi from "joi";

const taskCalendarValidationLogic = joi.object({
    title: joi.string().min(3).required(),
    date: joi.date().greater('now').required().iso()
});

export default taskCalendarValidationLogic;