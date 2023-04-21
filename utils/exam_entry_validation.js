const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)







const examSchema = Joi.object().keys({
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    exam_name: Joi.string(),
    exam_month_year: Joi.string(),

    exam_details: Joi.array().items(Joi.object().keys({
            classId: Joi.objectId(),
            subjectId: Joi.objectId(),
            fullmarks: Joi.number(),
            mark_divisions: Joi.array().items(Joi.object().keys({
                divisionNameId: Joi.objectId(),
                divisionMarks: Joi.number()
                })
            )
        }).unknown(true)
    ),

    status: Joi.string(),
    remarks: Joi.string(),
}).unknown(true);






const examUpdateSchema = Joi.object().keys({
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    exam_name: Joi.string(),
    exam_month_year: Joi.string(),

    exam_details: Joi.array().items(Joi.object().keys({
            classId: Joi.objectId(),
            subjectId: Joi.objectId(),
            fullmarks: Joi.number(),
            mark_divisions: Joi.array().items(Joi.object().keys({
                divisionNameId: Joi.objectId(),
                divisionMarks: Joi.number()
                })
            )
        }).unknown(true)
    ),

    status: Joi.string(),
    remarks: Joi.string(),
}).unknown(true);







const examDeleteSchema = Joi.object().keys({
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    exam_name: Joi.string(),
    exam_month_year: Joi.string(),

    exam_details: Joi.array().items(Joi.object().keys({
            classId: Joi.objectId(),
            subjectId: Joi.objectId(),
            fullmarks: Joi.number(),
            mark_divisions: Joi.array().items(Joi.object().keys({
                divisionNameId: Joi.objectId(),
                divisionMarks: Joi.number()
                })
            )
        }).unknown(true)
    ),

    status: Joi.string(),
    remarks: Joi.string(),
}).unknown(true);












module.exports = { 
    examSchema,
    examUpdateSchema,
    examDeleteSchema,
}