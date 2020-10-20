'user strict';
const Checkin = require('../model/checkinModel');

// .route('/checkin/:userId')
// .post(checkins.create_checkin)
// .get(checkins.get_checkin)
// .put(checkins.update_checkin)
// .delete(checkins.delete_checkin);

const isNull = (value) => typeof value === "object" && !value

exports.create_checkin = function(req, res) {
  //handles null error
   if(!(req.body.code)){
     res.status(400).send({ error:true, message: 'Missing info. Please add checkin code.'});
  } else {
    Checkin.createCheckin(req.body.userid, req.body.code, function(err, checkinId) {
    if (err){
      return res.status(404).send({message: checkinId});
    }
    res.json({checkinId: checkinId});
  });
}
};

exports.checkout_checkin = function(req, res) {
  if (!req.params.checkinId){
    res.status(400).send({error:true, message: "No checkinId provided to server. Cannot checkout."});
  }else {
    Checkin.checkout(req.params.checkinId, function(err, checkin){
      if (err){
        res.send(err);
      }
      res.status(200).send({message: "Succesfully checked out!"});

    });
  }

}

//TODO rest
