'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 知识点对象实体
 */
var QuestionSchema = new Schema({
    question_titile: { //试题题目
		type: String,
		default: ''
	},
    question_type: { //试题类型包括：单项选择 OC、多项选择 MC、简答题 SA、问答题 QA
        type: String,
        default: ''
    },
    question_hard: { //题目难度系数  1-10
        type: String,
        default: '1'
    },
    question_created: {//添加时间
		type: Date,
        default: Date.now,
		trim: true
	},
//    course: {       //所属的课程，外部引入
//        type: Schema.ObjectId,
//        ref: 'Course'
//    },
    point:{
        type: Schema.ObjectId,
        ref: 'Point'
    },
    question_choices: {
        type: []
    },
    question_answer:{
        type: String,
        default: '',
        trim: true
    }

});

mongoose.model('Question', QuestionSchema);