'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Stu Schema
 */
var StuSchema = new Schema({
	stu_name: {
		type: String,
		default: ''
	},
	stu_password: {
		type: String,
		default: '',
		trim: true

	},
	stu_birthday: {
        type: Date,
        default: Date.now,
        trim: true
    },
    stu_idcard: { //身份证号码
        type: String,
        default: '',
        trim: true,
        required: '身份证号码不能为空'
    }

});

mongoose.model('Stu', StuSchema);