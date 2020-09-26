'user strict';
const Checkin = require('../model/checkinModel');

// .route('/checkin/:userId')
// .post(checkins.create_checkin)
// .get(checkins.get_checkin)
// .put(checkins.update_checkin)
// .delete(checkins.delete_checkin);

const isNull = (value) => typeof value === "object" && !value

exports.create_checkin = function(req, res) {
  var newCheckin = new Checkin(req.body);
  console.log(!newCheckin.at_risk);

  //handles null error
   if(isNull(newCheckin.userid) || isNull(newCheckin.restid) || isNull(newCheckin.at_risk)){
     res.status(400).send({ error:true, message: 'Missing info. Please add userid, restid and at_risk.'});
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
