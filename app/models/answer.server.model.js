'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
//var extend = require('mongoose-schema-extend');

/**
 * Exam Schema
 */
var AnswerSchema = new Schema({
	exam_name: {//试卷的名称 比如（ F17班2015年 期中考试）
		type: String,
		default: ''
	},
	exam_group: { //参加考试的分组。可以是班级 比如 F17 设定后只有F17 班可以参加考试
    type: [{
        type: String
    }],
    default: ['admin']
},
//    exam_group_type:{//分组类型，比如按年级分组 或者班级分组 专业分组 等等，用来确定哪些类型的分组可以参加考试
//        type: String,
//        default: ''
//    },
    exam_time:{//考试时间计算 从点击考试到结束考试的 时间段计时
        type: String,
        default: '0'
    },
	exam_startDate: {//开始考试时间 限定这个考试什么时候能被学生看到 这样学生就可以开始考试
		type: Date,
        default: Date.now,
		trim: true
    },
    exam_endDate: {//结束考试时间 限定这个考试必须在什么时间完成。过了这个时间 这个试卷将作废
        type: Date,
        default: Date.now,
        trim: true
    },
    exam_questions:{
        type: [{
            type: String
        }],
        default: []
    },
    exam_isstart:{
        type:Boolean,
        default:false
    },
    exam_admin:{//试卷的归属者。谁是出卷人，组内可以加入用户名。
        type: [{
            type: String
        }],
        default: ['admin']
    },
    exam:{
        type: Schema.ObjectId,
        ref: 'Exam'
    },
    user:{
        type: Schema.ObjectId,
        ref: 'User'
    }

});

mongoose.model('Answer', AnswerSchema);