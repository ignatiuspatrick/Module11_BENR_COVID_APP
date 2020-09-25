'user strict';
var Checkin = require('../model/checkinModel');

// .route('/checkin/:userId')
// .post(checkins.create_checkin)
// .get(checkins.get_checkin)
// .put(checkins.update_checkin)
// .delete(checkins.delete_checkin);

exports.create_checkin = function(req, res) {
  var newCheckin = new Checkin(req.body);

  //handles null error
   if(false){
     res.status(400).send({ error:true, message: 'Please provide more information.'});
  } else {
  Checkin.createCheckin(newCheckin, function(err, checkin) {
    if (err){
      res.send(err);
    }
    res.json(checkin);
  });
}
};

//TODO rest
