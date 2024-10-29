import joi from "joi";

const remindersValidationLogic = joi.object({
    title: joi.string().min(3).required(),
    dateTime: joi.date().greater('now').required(),
    description: joi.string().min(3).required(),
})

export default remindersValidationLogic;