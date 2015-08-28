/**
 * Created by wupic on 2015/8/27.
 */
'use strict';

exports.create = function(req, res, next) {

    var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize(cfg.data + '/uploads')
        , file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)

};
