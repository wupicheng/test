'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * 知识点对象实体
 */
var PointSchema = new Schema({
    point_name: {
		type: String,
		default: ''
	},
    point_desc: {
		type: String,
		default: ''
    },
    point_created: {
		type: Date,
        default: Date.now,
		trim: true
	},
    course: {       //所属的课程，外部引入
        type: Schema.ObjectId,
        ref: 'Course'
    }

});

mongoose.model('Point', PointSchema);