const express = require('express');
const router = express.Router();
const createError = require('http-errors');


const { 
    Session,      
    School,
    Teacher,
    StudentADM,     //#
    StudentCURR,    //#
    Class,
    Section,
    Subject,
    Exam 
} = require('../models/all.model');


const { examSchema } = require('../utils/exam_entry_validation');


// const { studentAdmSchema, studentAdmUpdateSchema, studentAdmDeleteSchema, studentCurrSchema, studentCurrUpdateSchema, studentCurrDeleteSchema } = require('../utils/student_entry_validation');



// ../api/exam
router.get('/', async(req, res, next)=>{

    try{
        const classes = await Class.find({})
        .select({'class_name_roman': 1, 'class_sections':1, '_id': 0})
            .populate({
                path:'class_sections',
            //     //match: { section_name: { $eq: 'D' } },
            //     select: {'section_name': 1, '_id': 0}
            }).exec()

        if(!classes){
            throw createError.Conflict(`This link of url has been verified or expired.`);
        }



        
        res.send({
            status: 200, 
            classes

        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        console.log(error.message);
        next(error);        
    }
});



router.get('/details', async(req, res, next)=>{

    try{
        // const exams = await Exam.find({})
        //     .select({'sessionId': 1, 'exam_name':1, 'exam_month_year':1, 'exam_details':1,  '_id': 0})
        //     .populate({
        //         path:'exam_details.classId',
        //         model: 'Class'
        //     })
        //     .populate({
        //         path:'exam_details.classId.class_sections',
        //         model: 'Section'
        //     })
        //     .populate({
        //         path:'exam_details.subjectId',
        //         model: 'Subject'
        //     })
        //     .exec()

        const exams = await Exam.find({})
            .select({'sessionId': 1, 'exam_name':1, 'exam_month_year':1, 'exam_details':1,  '_id': 0})
            .populate({
                path: 'exam_details'
            }).exec();



        if(!exams){
            throw createError.Conflict(`This link of url has been verified or expired.`);
        }



        res.send({
            status: 200, 
            exams: exams

        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        console.log(error.message);
        next(error);        
    }
});



router.post('/details', async(req, res, next)=>{
    try{
        const result = await examSchema.validateAsync(req.body);

        const doesExist = await Exam.findOne({_id: result._id});
        if(doesExist){
            throw createError.Conflict(`This Exam Details with id '${result._id}' has been already taken.`);
        }
        
        const examDetails = new Exam(result);
        const savedExamDetails = await examDetails.save();
        



        res.status(200).json({
            examDetails: savedExamDetails
        });

    }catch(error){
        if(error.isJoi === true){
            error.status = 422;
        }
        console.log(error.message);
        next(error);        
    }
});





module.exports = router


