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
	},stu_sex:{
      type:String,
       default:''
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
    },stu_img:{
        type:String,
        default:'img\\person.gif',
        trim:true
    },stu_phone:{
        type:String,
        default:'',
        trim:true
    },stu_address:{
        type:String,
        default:'',
        trim:true
    },stu_origin:{
        type:String,
        default:'',
        trim:true
    },stu_jianli:{
        type:String,
        default:'',
        trim:true
    },stu_parent_dad_name:{
        type:String,
        default:'',
        trim:true
    },stu_parent_dad_phone:{
        type:String,
        default:'',
        trim:true
    },stu_parent_mum_name:{
        type:String,
        default:'',
        trim:true
    },stu_parent_mum_phone:{
        type:String,
        default:'',
        trim:true
    }
});

mongoose.model('Stu', StuSchema);