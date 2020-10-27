'user strict';
var sql = require('../../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;


/*  app.route('users').post(users.create_user);
  app.route('users/:userId')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);*/

//superUser object constructor, needs more fields
var Superuser = function(superuser){
    this.username = superuser.username;
    this.password = superuser.password; //bcrypt this
    this.confirm = superuser.confirm;
    this.email=superuser.email;
    this.type = superuser.type;
};


//create a superuser. Does not log them in yet.
Superuser.createSuperuser = function (newSuperuser, result) {

  //Asynchronous approach so that it is faster.
  bcrypt.hash(newSuperuser.password, saltRounds).then(function(hash){
    newSuperuser.password = hash; //replace with hash before storing
      sql.query("INSERT INTO superusers SET username = ?, password=?, email=?,type=?", [newSuperuser.username, newSuperuser.password, newSuperuser.email, newSuperuser.type], function (err, res) {
        if(err) {
            console.log("error: ", err);
            if(err.errno === 1062){
              result("Username "+ newSuperuser.username + " already taken!", null);
            }
            else{
              result("SQL error, check logs.", null);
            }
        }
        else{
            result(null, res.insertId);
        }
      });
    
  });

};

//Check if ownederid corresponds with restid.
Superuser.checkValidRestid = function(ownerid, restid, result) {
  sql.query("SELECT COUNT(id) as c FROM restaurants WHERE ownerid = ? AND id = ?",[ownerid, restid], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
        result(null, res[0].c);
    }
  });
}

//Returns Total visits over specified time.
Superuser.visited = function (restid, days, result) {
  var startDay = new Date(new Date().toDateString());
  var endDay = new Date(startDay);
  startDay.setHours(startDay.getHours() - 24 * days)
  endDay.setHours(endDay.getHours() + 24);
  //Asynchronous approach so that it is faster.
  sql.query("SELECT COUNT(id) as c FROM checkin WHERE restid = ? AND checkin_time >= ? AND checkin_time < ?",[restid, startDay, endDay], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
        result(null, res[0].c);
    }
  });
}

//Returns Total infections over specified time.
Superuser.infected = function (days, result) {
  var startDay = new Date(new Date().toDateString());
  var endDay = new Date(startDay);
  startDay.setHours(startDay.getHours() - 24 * days)
  endDay.setHours(endDay.getHours() + 24);
  //Asynchronous approach so that it is faster.
  sql.query("SELECT COUNT(id) as c FROM users WHERE infected_since >= ? AND infected_since < ?",[startDay, endDay], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
        result(null, res[0].c);
    }
  });
}

//Returns Total marked at risk over specified time.
Superuser.marked = function (days, result) {
  var startDay = new Date(new Date().toDateString());
  var endDay = new Date(startDay);
  startDay.setHours(startDay.getHours() - 24 * days)
  endDay.setHours(endDay.getHours() + 24);
  //Asynchronous approach so that it is faster.
  sql.query("SELECT COUNT(id) as c FROM users WHERE at_risk_since >= ? AND at_risk_since < ?",[startDay, endDay], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
        result(null, res[0].c);
    }
  });
}

//Returns Total restaurants with infections over specified time.
Superuser.infectedrestaurants = function (days, result) {
  var startDay = new Date(new Date().toDateString());
  var endDay = new Date(startDay);
  startDay.setHours(startDay.getHours() - 24 * days)
  endDay.setHours(endDay.getHours() + 24);
  //Asynchronous approach so that it is faster.
  sql.query("SELECT COUNT(DISTINCT restaurants.id) as c FROM restaurants, checkin, users WHERE restaurants.id = checkin.restid AND checkin.userid = users.id AND infected_since >= ? AND infected_since < ?",[startDay, endDay], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
        result(null, res[0].c);
    }
  });
}


//Returns a list with check-in time / check-out time of infected customers.
Superuser.listInfections = function(restid, result) {
  sql.query("SELECT checkin.checkin_time, checkin.checkout_time FROM checkin, users WHERE checkin.userid = users.id AND users.infected = 1 AND checkin.restid = ?",[restid], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
      console.log(res)
      result(null, res);
    }
  });
}

//Returns a list with of restids owned by the ownerid.
Superuser.getrestids = function(ownerid, result) {
  sql.query("SELECT restaurants.id, restaurants.name FROM restaurants, superusers WHERE restaurants.ownerid = superusers.id AND superusers.id = ?",[ownerid], function (err, res) {
    if(err) {
        console.log("error: ", err);
        result("SQL error, check logs.", null);
        return;
    }
    else {
      console.log(res)
      result(null, res);
    }
  });
}

Superuser.loginSuperuser = function(username, password, type, result){
  sql.query('SELECT password, id FROM superusers WHERE username = ? AND type = ?', [username,type], function(err, queryresult, fields) {
      if(err){
        console.log("error: ", err);
        result(err, -1);
      } else {
        if(queryresult.length>0){
          let hash = queryresult[0].password;
          bcrypt.compare(password, hash).then(function(success) {
            if(success) {
              result(null, queryresult[0].id);
            }else{
            result(null, -1);
            }
          }).catch((error) => {
            result(error,'Promise error');
          });
        }else{
          result(null, -1);
        }
      }
  });
};


module.exports = Superuser;
