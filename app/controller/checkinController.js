'user strict';
const Checkin = require('../model/checkinModel');

// .route('/checkin/:userId')
// .post(checkins.create_checkin)
// .get(checkins.get_checkin)
// .put(checkins.update_checkin)
// .delete(checkins.delete_checkin);

const isNull = (value) => typeof value === "object" && !value

/**
 *  Post /users/checkin
 *  Checks a customer in to a restaurant.
 *
 *  protected:
 *  Customer
 *
 *  Body:
 *  code - QR code of restaurant.
 */
exports.create_checkin = function(req, res) {
  //handles null error
   if(!(req.body.code)){
     res.status(400).send({ error:true, message: 'Missing info. Please add checkin code.'});
  } else {
    Checkin.createCheckin(req.body.userid, req.body.code, function(err, checkinId) {
    if (err){
      return res.status(400).send({error: true, message: checkinId});
    } else if (checkinId < 0){
      return res.status(200).send({error: false, message: "User is still marked as infected."});
    }
    res.status(200).json({checkinId: checkinId});
  });
}
};

/*
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
*/
