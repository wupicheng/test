'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	_ = require('lodash');

/**
 * Create a article
 */
exports.create = function(req, res,next) {

    //file = req.files.file.path;

    console.log(req.files.file.path);

//    var data = _.pick(req.body, 'type')
//        , uploadPath = req.files.file.path
//        , file = req.files.file;



    var file= req.files.file;
    var data={'path':file.path,
              'filename':file.originalFilename
              };
    return res.json(data);

};


/**
 *  files:
 { file:
    { fieldName: 'file',
      originalFilename: '未标题-1.jpg',
      path: 'public\\upload\\tyfFO_C9tdxECMrhLaNGErhk.jpg',
      headers: [Object],
      size: 33600,
      name: '未标题-1.jpg',
      type: 'image/jpeg' } },
 *
 */