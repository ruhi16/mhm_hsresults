const express = require('express');
const router = express.Router();
const createError = require('http-errors');


const { Session, School, Teacher, Subject, Section, Class } = require('../models/all.model');



const { sessionSchema, sessionUpdateSchema, sessionDeleteSchema } = require('../utils/basic_entity.model');
const { schoolSchema, schoolUpdateSchema, schoolDeleteSchema } = require('../utils/basic_entity.model');
const { teacherSchema, teacherUpdateSchema, teacherDeleteSchema } = require('../utils/basic_entity.model');
const { subjectSchema, subjectUpdateSchema, subjectDeleteSchema } = require('../utils/basic_entity.model');
const { sectionSchema, sectionUpdateSchema, sectionDeleteSchema } = require('../utils/basic_entity.model');
const { classSchema, classUpdateSchema, classDeleteSchema } = require('../utils/basic_entity.model');






// ../api/basics
router.get('/', (req, res)=>{
    res.send({
        status: 200, 
        message: "This is for Basics: Session, School, Teacher,  Class, Section, Subject, StudentADM, StudentCURR"
    });
});


// ======================== Session Completed ===================================
router.get('/session', async(req,res,next)=>{
    try{
        const session = await Session.find({});

        if(!session){
            throw createError.Conflict(`This Session does not exists.`);
        }

        res.send({
            status: 200,
            session: session
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/session', async(req,res,next)=>{
    try{
        // console.log(req.body);
        const result = await sessionSchema.validateAsync(req.body);
        // console.log(result);

        const doesExist = await Session.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Session with id '${result._id}' has been already taken.`);
        }

        const session = new Session(result);
        const savedSession = await session.save();
        
        res.send({
            status: 200,
            session: savedSession
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/session', async(req,res,next)=>{
    try{
        // console.log("before",req.body);
        const result = await sessionUpdateSchema.validateAsync(req.body);
        // console.log("after: ",result);        

        const updatedSession = await Session.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "session_name": 1, "status": 1 });

        // console.log("updated Financial Year: ", updatedFinancialYear);

        if(!updatedSession){
            throw createError.Conflict(`This updatedSession '${result.session_name}' does not exists.`);
        }
        
        res.send({
            status: 200,
            session: updatedSession
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/session', async(req,res,next)=>{
    try{
        // console.log("before", req.body);
        const result = await sessionDeleteSchema.validateAsync(req.body);
        // console.log("after: ", result);   

        const deletedSession = await Session.findOneAndDelete(
            {_id: result._id}
        ).select({ "session_name": 1, "start_date": 1,"end_date": 1, "status": 1 });

        // console.log("updated Financial Year: ", deletedFinancialYear);

        if(!deletedSession){
            throw createError.Conflict(`This updatedSession '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            session: deletedSession
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});








// ======================== School Completed ===================================
router.get('/schools', async(req, res, next)=>{
    try{
        const schools = await School.find({});

        if(!schools){
            throw createError.Conflict(`This School is expired.`);
        }

        res.send({
            status: 200,
            schools: schools
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/schools', async(req, res, next)=>{    
    try{        
        const result = await schoolSchema.validateAsync(req.body);
        
        const doesExist = await School.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This School with id '${result._id}' has been already taken.`);
        }

        const school = new School(result);
        const savedSchool = await school.save();
        
        res.send({
            status: 200,
            school: savedSchool
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/schools', async(req, res, next)=>{
    try{        
        const result = await schoolUpdateSchema.validateAsync(req.body);
        
        const updatedSchool = await School.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "email": 1, "dise": 1, "status": 1 });


        if(!updatedSchool){
            throw createError.Conflict(`This School '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedSchool: updatedSchool,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/schools', async(req, res, next)=>{
    try{        
        const result = await schoolDeleteSchema.validateAsync(req.body);        

        const deletedSchool = await School.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "email": 1, "status": 1 });
        

        if(!deletedSchool){
            throw createError.Conflict(`This School '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedschool: deletedSchool,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }

});






//=========================== Teacher Completed ========================================
router.get('/teachers', async(req, res, next)=>{
    try{
        const teachers = await Teacher.find({});

        if(!teachers){
            throw createError.Conflict(`Teachers does not exists`);
        }

        res.send({
            status: 200,
            teachers: teachers
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/teachers', async(req, res, next)=>{
    try{        
        const result = await teacherSchema.validateAsync(req.body);
        
        const doesExist = await Teacher.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Teacher with id '${result._id}' has been already taken.`);
        }

        const teacher = new Teacher(result);
        const savedTeacher = await teacher.save();
        
        res.send({
            status: 200,
            teacher: savedTeacher
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/teachers', async(req, res, next)=>{
    try{        
        const result = await teacherUpdateSchema.validateAsync(req.body);
        
        const updatedTeacher = await Teacher.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "fatherName": 1, "email": 1, "status": 1 });


        if(!updatedTeacher){
            throw createError.Conflict(`This Teacher '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedTeacher: updatedTeacher,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/teachers', async(req, res, next)=>{
    try{        
        const result = await teacherDeleteSchema.validateAsync(req.body);        

        const deletedTeacher = await Teacher.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "email": 1, "status": 1 });
        

        if(!deletedTeacher){
            throw createError.Conflict(`This Teacher '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedTeacher: deletedTeacher,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});






//=========================== Subject Completed ========================================
router.get('/subjects', async(req, res, next)=>{
    try{
        const subjects = await Subject.find({});

        if(!subjects){
            throw createError.Conflict(`Subjects does not exists`);
        }

        res.send({
            status: 200,
            subjects: subjects
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/subjects', async(req, res, next)=>{
    try{        
        const result = await subjectSchema.validateAsync(req.body);
        
        const doesExist = await Subject.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Subject with id '${result._id}' has been already taken.`);
        }

        const subject = new Subject(result);
        const savedSubject = await subject.save();
        
        res.send({
            status: 200,
            subject: savedSubject
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/subjects', async(req, res, next)=>{
    try{        
        const result = await subjectUpdateSchema.validateAsync(req.body);
        
        const updatedSubject = await Subject.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "subject_name": 1, "subject_name_short": 1, "status": 1 });


        if(!updatedSubject){
            throw createError.Conflict(`This Subject '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedSubject: updatedSubject,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/subjects', async(req, res, next)=>{
    try{        
        const result = await subjectDeleteSchema.validateAsync(req.body);        

        const deletedSubject = await Subject.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "subject_name": 1, "subject_name_short": 1, "status": 1 });
        

        if(!deletedSubject){
            throw createError.Conflict(`This Subject '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedSubject: deletedSubject,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});




//=========================== Section Completed ========================================
router.get('/sections', async(req, res, next)=>{
    try{
        const sections = await Section.find({});

        if(!sections){
            throw createError.Conflict(`Sections does not exists`);
        }

        res.send({
            status: 200,
            sections: sections
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/sections', async(req, res, next)=>{
    try{        
        const result = await sectionSchema.validateAsync(req.body);
        
        const doesExist = await Section.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Section with id '${result._id}' has been already taken.`);
        }

        const section = new Section(result);
        const savedSection = await section.save();
        
        res.send({
            status: 200,
            section: savedSection
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/sections', async(req, res, next)=>{
    try{        
        const result = await sectionUpdateSchema.validateAsync(req.body);
        
        const updatedSection = await Section.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "section_name": 1, "status": 1 });


        if(!updatedSection){
            throw createError.Conflict(`This Section '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedSection: updatedSection,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/sections', async(req, res, next)=>{
    try{        
        const result = await sectionDeleteSchema.validateAsync(req.body);        

        const deletedSection = await Section.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "section_name": 1, "status": 1 });
        

        if(!deletedSection){
            throw createError.Conflict(`This Section '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedSection: deletedSection,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});






//=========================== Class Completed ========================================
router.get('/classes', async(req, res, next)=>{
    try{
        const classes = await Class.find({});

        if(!classes){
            throw createError.Conflict(`Classes does not exists`);
        }

        res.send({
            status: 200,
            classes: classes
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/classes', async(req, res, next)=>{
    try{        
        const result = await classSchema.validateAsync(req.body);
        
        const doesExist = await Class.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Class with id '${result._id}' has been already taken.`);
        }

        const classs = new Class(result);
        const savedClass = await classs.save();
        
        res.send({
            status: 200,
            class: savedClass
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/classes', async(req, res, next)=>{
    try{        
        const result = await classUpdateSchema.validateAsync(req.body);
        
        const updatedClass = await Class.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "class_name_roman": 1, "class_name_number": 1, "status": 1 });


        if(!updatedClass){
            throw createError.Conflict(`This Class '${result.name}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedClass: updatedClass,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/classes', async(req, res, next)=>{
    try{        
        const result = await classDeleteSchema.validateAsync(req.body);        

        const deletedClass = await Class.findOneAndDelete(
            {_id: result._id}
        ).select({ "class_name_roman": 1, "class_name_number": 1, "status": 1 });
        

        if(!deletedClass){
            throw createError.Conflict(`This Class '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedClass: deletedClass,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});














module.exports = router