const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)





const studentAdmSchema = Joi.object({
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    name: Joi.string().min(3).max(50).required(),
    fatherName: Joi.string().min(3).max(50),
    registrationNo: Joi.string().min(3).max(50),
    registrationDate: Joi.date().raw(),
    registrationYear: Joi.string().min(3).max(50),

    gender: Joi.string().valid('Male','Female','Others'),
    dob: Joi.date().raw(),

    admClassId: Joi.objectId(),
    admSubjectIds: Joi.array().items(Joi.objectId()),


    admDate: Joi.date().raw(),
    admSlNo: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string().min(3).max(100),
});  

const studentAdmUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    name: Joi.string().min(3).max(50).required(),
    fatherName: Joi.string().min(3).max(50).required(),
    registrationNo: Joi.string().min(3).max(50),
    registrationDate: Joi.date().raw(),
    registrationYear: Joi.string().min(3).max(50),

    gender: Joi.string().valid('Male','Female','Others'),
    dob: Joi.date().raw(),

    admClassId: Joi.objectId(),
    admSubjectIds: Joi.array().items(Joi.objectId()),


    admDate: Joi.date().raw(),
    admSlNo: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string().min(3).max(100),
});    

const studentAdmDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
});    








const studentCurrSchema = Joi.object({        
    _id:  Joi.objectId(),    
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    studentAdmId: Joi.objectId(),

    classId: Joi.objectId(),
    sectionId: Joi.objectId(),
    rollNo: Joi.number().integer().min(1).max(1000),


    status: Joi.string(),
    remarks: Joi.string(),

}); 

const studentCurrUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    sessionId: Joi.objectId(),
    studentAdmId: Joi.objectId(),

    classId: Joi.objectId(),
    sectionId: Joi.objectId(),
    rollNo: Joi.number().integer().min(1).max(1000),


    status: Joi.string(),
    remarks: Joi.string(),
});    

const studentCurrDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
});    









module.exports = { 
    studentAdmSchema,
    studentAdmUpdateSchema,
    studentAdmDeleteSchema,


    studentCurrSchema,
    studentCurrUpdateSchema,
    studentCurrDeleteSchema,






}