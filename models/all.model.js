const mongoose = require('mongoose');



const sessionSchema = new mongoose.Schema({
    id: {type: Number},
    session_name:  {type: String, required: true},
    session_description:  {type: String, required: true},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},

    status: {type: String, required: true, default: 'inactive'},
    remarks: {type: String},
    
}, {timestamps: true});


sessionSchema.post('save', function() {
    console.log("Session: POST('save') hook");
    try{
        this._id = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        this.__v = undefined;        
    }catch(error){
        next(error);
    }
});

sessionSchema.post('find', function() {
    console.log("Session: POST('find') hook");
    try{
        this._id = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        this.__v = undefined;        
    }catch(error){
        next(error);
    }
});

const Session = mongoose.model('Session', sessionSchema);


















const schoolSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String, required: true},
    dise: {type: String},
    grade: {type: String, required: true},  // primary, junior-high, high, higher secondary
        
    schedule_time: {type: String, required: true}, // 10:30am to 4:30pm
    
    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},

    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],
    imgurl: [{type: String}],

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const School = mongoose.model('School', schoolSchema);







const teacherSchema = new mongoose.Schema({
    id: {type: Number},    
    name: {type: String, required: true},
    fatherName: {type: String},

    vill: {type: String},
    post: {type: String},
    ps: {type: String},
    dist: {type: String},
    pin: {type: String},

    email: {type: String, required: true, lowercase: true},
    mobile: [{type: String, required: true}],
    imgurl: [{type: String}],

    dob: {type: Date, required: true},
    doj: {type: Date, required: true},
    dor: {type: Date, required: true},

    subject_main: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    subject_others: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],

    

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
    
}, {timestamps: true});
const Teacher = mongoose.model('Teacher', teacherSchema);






const StudentADMSchema = new mongoose.Schema({
    id: {type: Number},
    sessionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    name: {type: String, required: true},
    fatherName: {type: String},
    registrationNo: {type: String},
    registrationDate: {type: Date},
    registrationYear: {type: String},
    
    gender: {type: String, enum: ["Male", "Female", "Others"]},
    dob: {type: Date},

    admClassId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    admSubjectIds:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],


    admDate: {type: Date},
    admSlNo: {type: String},

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
    
}, {timestamps: true});
const StudentADM = mongoose.model('StudentADM', StudentADMSchema);


const classSchema = new mongoose.Schema({
    id: {type: Number},
    class_name_roman:  {type: String, required: true},
    class_name_number:  {type: String, required: true},
    class_name_word:  {type: String, required: true},
    
    class_grade:  {type: String, required: true},  
    
    class_sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],


    status: {type: String, required: true, default: 'inactive'},
    remarks: {type: String},
    
}, {timestamps: true});
const Class = mongoose.model('Class', classSchema);


const sectionSchema = new mongoose.Schema({
    id: {type: Number},
    section_name:  {type: String, required: true},
    section_description:  {type: String},


    status: {type: String, required: true, default: 'inactive'},
    remarks: {type: String},
    
}, {timestamps: true});
const Section = mongoose.model('Section', sectionSchema);




const subjectSchema = new mongoose.Schema({
    id: {type: Number},
    subject_name:  {type: String, required: true},
    subject_name_short:  {type: String, required: true},
    subject_description:  {type: String},
    standard: {type: String},

    status: {type: String, required: true, default: 'inactive'},
    remarks: {type: String},
    
}, {timestamps: true});
const Subject = mongoose.model('Subject', subjectSchema);



const studentCURRSchema = new mongoose.Schema({
    id: {type: Number},
    sessionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    studentAdmId:  {type: mongoose.Schema.Types.ObjectId, ref: 'StudentADM'},
   
    classId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    sectionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
    rollNo: {type: Number, required: true},

    

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
    
}, {timestamps: true});
const StudentCURR = mongoose.model('StudentCURR', studentCURRSchema);




// const examMarksDivisionNameSchema = new mongoose.Schema({
//     examMarksDivisionName: { type: String }
// });
// const ExamMarksDivisionName = mongoose.model('ExamMarksDivisionName', examMarksDivisionNameSchema);





















const projectOptionsSchema = new mongoose.Schema({
    optionName: { type: String },
    optionModel: { type: String }
});
const ProjectOption = mongoose.model('ProjectOption', projectOptionsSchema);


const examSchema = new mongoose.Schema({
    id: {type: Number},
    sessionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    exam_name: {},
    exam_month_year: {},
    
    exam_details: [{
        classId: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
        subjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
        fullmarks: {type: Number},
        marks_divitions:[{
            divisionNameId: {type: mongoose.Schema.Types.ObjectId, ref: 'ProjectOption'},
            divisionMarks: {type: Number}
        }]
    }],

    status: {type: String, required: true, default: 'active'},
    remarks: {type: String}
    
}, {timestamps: true});
const Exam = mongoose.model('Exam', examSchema);



const examScheduleSchema = new mongoose.Schema({
    id: {type: Number},
    sessionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    examId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Exam'},
  
    date: {type: Date, required: true},
    time_ranges: {type: Date, required: true},
    classId: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    sectionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Section'},
    subjectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},    

    examinnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},



    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},
    
}, {timestamps: true});
const ExamSchedule = mongoose.model('ExamSchedule', examScheduleSchema);


const examMarksEntrySchema = new mongoose.Schema({
    id: {type: Number},
    sessionId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    examId:  {type: mongoose.Schema.Types.ObjectId, ref: 'Exam'},
    examScheduleId:  {type: mongoose.Schema.Types.ObjectId, ref: 'ExamSchedule'},

    studentCurrId :{type: mongoose.Schema.Types.ObjectId, ref: 'StudentCURR'},


    
    status: {type: String, required: true, default: 'active'},
    remarks: {type: String},

}, {timestamps: true});
const ExamMarksEntry = mongoose.model('ExamMarksEntry', examMarksEntrySchema);























module.exports = {
    Session,      
    School,
    Teacher,
    StudentADM,     //#
    StudentCURR,    //#
    Class,
    Section,
    Subject,

    ProjectOption,
    Exam,
    ExamSchedule,
    ExamMarksEntry
    
    
};


