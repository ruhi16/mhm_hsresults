const express = require('express');
const router = express.Router();
const createError = require('http-errors');


const { StudentADM, StudentCURR } = require('../models/all.model');


const { studentAdmSchema, studentAdmUpdateSchema, studentAdmDeleteSchema, studentCurrSchema, studentCurrUpdateSchema, studentCurrDeleteSchema } = require('../utils/student_entry_validation');


//=========================== Student Completed ========================================
router.get('/', async(req, res) => {
    res.send({
        status: 200, 
        message: "This is for Student: Admission"
    });
});



//=========================== Student Admissions Completed ========================================
router.get('/admissions', async(req, res, next)=>{
    try{
        const studentadms = await StudentADM.find({});

        if(!studentadms){
            throw createError.Conflict(`No New StudentADM exists.`);
        }

        res.send({
            status: 200,
            studentadms: studentadms
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/admissions', async(req, res, next)=>{
    try{        
        const result = await studentAdmSchema.validateAsync(req.body);
        
        const doesExist = await StudentADM.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Students's Admisson with id '${result._id}' has been already taken.`);
        }

        const studentAdm = new StudentADM(result);
        const savedStudentAdm = await studentAdm.save();
        
        res.send({
            status: 200,
            studentAdm: studentAdm
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/admissions', async(req, res, next)=>{
    try{        
        const result = await studentAdmUpdateSchema.validateAsync(req.body);
        
        const updatedStudentAdm = await StudentADM.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "name": 1, "fatherName": 1, "status": 1 });


        if(!updatedStudentAdm){
            throw createError.Conflict(`This Student Adimission '${result._id}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedStudentAdm: updatedStudentAdm,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/admissions', async(req, res, next)=>{
    try{        
        const result = await studentAdmDeleteSchema.validateAsync(req.body);

        const deletedStudenAdm = await StudentADM.findOneAndDelete(
            {_id: result._id}
        ).select({ "name": 1, "fatherName": 1, "status": 1 });
        

        if(!deletedStudenAdm){
            throw createError.Conflict(`This Student Admission '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedStudenAdm: deletedStudenAdm,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});



//=========================== Student Current Session Completed ========================================
router.get('/activesessions', async(req, res, next)=>{
    try{
        const studentcurrs = await StudentCURR.find({});

        if(!studentcurrs){
            throw createError.Conflict(`Students from Current Session does not exists.`);
        }

        res.send({
            status: 200,
            studentcurrs: studentcurrs
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.post('/activesessions', async(req, res, next)=>{
    try{        
        const result = await studentCurrSchema.validateAsync(req.body);
        
        const doesExist = await StudentCURR.findOne({_id: result._id});
        
        if(doesExist){
            throw createError.Conflict(`This Students's Current Session with id '${result._id}' has been already taken.`);
        }

        const studentcurr = new StudentCURR(result);
        const savedStudentCurr = await studentcurr.save();
        
        res.send({
            status: 200,
            studentCurr: savedStudentCurr
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.put('/activesessions', async(req, res, next)=>{
    try{        
        const result = await studentCurrUpdateSchema.validateAsync(req.body);
        
        const updatedStudentCurr = await StudentCURR.findOneAndUpdate(
            {_id: result._id}, result, {new: true}
        ).select({ "sessionId": 1, "studentAdmId": 1, "classId": 1, "sectionId": 1,  "rollNo": 1, "status": 1 });


        if(!updatedStudentCurr){
            throw createError.Conflict(`This Student Current Session '${result._id}' does not exists.`);
        } 

        res.send({
            status: 200,
            updatedStudentCurr: updatedStudentCurr,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

router.delete('/activesessions', async(req, res, next)=>{
    try{        
        const result = await studentCurrDeleteSchema.validateAsync(req.body);

        const deletedStudenCurr = await StudentCURR.findOneAndDelete(
            {_id: result._id}
        ).select({ "sessionId": 1, "studentAdmId": 1, "classId": 1, "sectionId": 1,  "rollNo": 1, "status": 1 });
        

        if(!deletedStudenCurr){
            throw createError.Conflict(`This Student Current Session '${result._id}' does not exists.`);
        }
        
        res.send({
            status: 200,
            deletedStudenCurr: deletedStudenCurr,
            payload: result,
        });

    }catch(error){
        console.log(error.message);
        next(error);  
    }
});

















module.exports = router