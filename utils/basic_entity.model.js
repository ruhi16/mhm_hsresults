const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

// ================== Session ========================
const sessionSchema = Joi.object({
    id: Joi.number().integer().min(1).max(10000), 
    session_name: Joi.string().min(3).max(30).required(),
    session_description: Joi.string().min(3).max(100).required(),
    
    start_date: Joi.date().raw().required(), // set desired date format here
    end_date: Joi.date().raw().required(),
    
    remarks: Joi.string().min(3).max(100),
});    

const sessionUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number().integer().min(1).max(10000), 
    session_name: Joi.string().min(3).max(30).required(),
    session_description: Joi.string().min(3).max(100).required(),

    start_date: Joi.date().raw().required(), // set desired date format here
    end_date: Joi.date().raw().required(), 
    
    status: Joi.string().min(3).max(30).required(),
    remarks: Joi.string().min(3).max(30),
});    

const sessionDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
});    



// =========================== School =========================
const schoolSchema = Joi.object({    
    id: Joi.number(),
    name: Joi.string().required(),
    dise: Joi.string(),
    grade: Joi.string().required(),  // primary, junior-high, high, higher secondary
        
    schedule_time: Joi.string().required(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),
    
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolUpdateSchema = Joi.object({
    _id: Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    dise: Joi.string(),
    grade: Joi.string().required(),  // primary, junior-high, high, higher secondary
        
    schedule_time: Joi.string().required(), // 10:30am to 4:30pm
    
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),
    
    status: Joi.string(),
    remarks: Joi.string(),
});

const schoolDeleteSchema = Joi.object({
    _id: Joi.objectId(),
});





//=========== Teacher Validation =============
const teacherSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    fatherName: Joi.string(),
        
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),
    
    dob: Joi.date().raw().required(), 
    doj: Joi.date().raw().required(), 
    dor: Joi.date().raw().required(), 

    subject_main: Joi.objectId(),
    subject_others: Joi.array().items(Joi.objectId()),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const teacherUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    name: Joi.string().required(),
    fatherName: Joi.string(),
        
    vill: Joi.string(),
    post: Joi.string(),
    ps: Joi.string(),
    dist: Joi.string(),
    pin: Joi.string(),

    email: Joi.string().email().lowercase().required(),    
    mobile: Joi.array().items(Joi.string().min(0).max(10)),
    imgurl: Joi.array().items(Joi.string().uri()),
    
    dob: Joi.date().raw().required(), 
    doj: Joi.date().raw().required(), 
    dor: Joi.date().raw().required(), 

    subject_main: Joi.objectId(),
    subject_others: Joi.array().items(Joi.objectId()),

    status: Joi.string(),
    remarks: Joi.string(),    
}); 

const teacherDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
}); 


//============= Subject Validation ===============
const subjectSchema = Joi.object({    
    id: Joi.number(),
    subject_name: Joi.string().required(),
    subject_name_short: Joi.string().required(),
    subject_description: Joi.string(),
    standard: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const subjectUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    subject_name: Joi.string().required(),
    subject_name_short: Joi.string().required(),
    subject_description: Joi.string().required(),
    standard: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const subjectDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
}); 




//============= Section Validation ===============
const sectionSchema = Joi.object({    
    id: Joi.number(),
    section_name: Joi.string().required(),    
    section_description: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const sectionUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    section_name: Joi.string().required(),    
    section_description: Joi.string(),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const sectionDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
}); 





//============= Class Validation ===============
const classSchema = Joi.object({    
    id: Joi.number(),
    class_name_roman: Joi.string().required(),    
    class_name_number: Joi.string().required(),
    class_name_word: Joi.string().required(),    

    class_grade: Joi.string().required(),    

    class_sections: Joi.array().items(Joi.objectId()),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const classUpdateSchema = Joi.object({    
    _id:  Joi.objectId(),
    id: Joi.number(),
    class_name_roman: Joi.string().required(),    
    class_name_number: Joi.string().required(),
    class_name_word: Joi.string().required(),    

    class_grade: Joi.string().required(),    

    class_sections: Joi.array().items(Joi.objectId()),

    status: Joi.string(),
    remarks: Joi.string(),
}); 

const classDeleteSchema = Joi.object({    
    _id:  Joi.objectId(),
}); 






















module.exports = { 
    sessionSchema, 
    sessionUpdateSchema,
    sessionDeleteSchema,

    schoolSchema,
    schoolUpdateSchema,
    schoolDeleteSchema,


    teacherSchema,
    teacherUpdateSchema,
    teacherDeleteSchema,


    subjectSchema,
    subjectUpdateSchema,
    subjectDeleteSchema,


    sectionSchema,
    sectionUpdateSchema,
    sectionDeleteSchema,


    classSchema,
    classUpdateSchema,
    classDeleteSchema,

}

