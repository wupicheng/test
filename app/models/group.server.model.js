'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Exam Schema
 */
var GroupSchema = new Schema({
	group_name: {//分组名称
		type: String,
		default: ''
	},
	group_type: { //分组类型
		type: String,
		default: '',
		trim: true,
		required: ''
	},
    create_date:{//分组数据入库时间（时间戳）
        type: Date,
        default: Date.now
    },
    group_desc:{//分组的描述
        type: String,
        default: '',
        trim: true,
        required: ''
    }

});

mongoose.model('Group', GroupSchema);