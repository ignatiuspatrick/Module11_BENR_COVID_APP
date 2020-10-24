var sql = require('../../db.js');
var mysql = require('mysql');

module.exports = {

  removeCheckins: function(){
      sql.query("DELETE FROM checkin WHERE created_at < timestampadd(WEEK, -2, now())", function(err, res){
        if(err){
          console.log("Error occured while attempting to delete checkouts. Please check.");
          return "error";
        } else {
          console.log("Removed checkin for: " + res.affectedRows + " rows.");;
          return res.affectedRows;
        }
      });
  },

  removeInfected: function(){
    sql.query("UPDATE users SET infected = 0, infected_since = NULL WHERE infected_since < timestampadd(WEEK, -2, now())", function(err, res){
      if(err){
        console.log("Error occured while attempting to delete checkouts. Please check.");
        return "error";
      } else {
        console.log("Removed infected for: " + res.affectedRows + " rows.");
        return res.affectedRows;
      }
    });
  },

  removeAtRisk: function(){
    sql.query("UPDATE users SET at_risk = 0, at_risk_since = NULL WHERE at_risk_since < timestampadd(WEEK, -2, now())", function(err, res){
      if(err){
        console.log("Error occured while attempting to delete checkouts. Please check.");
        return "error";
      } else {
        console.log("Removed at risk for: " + res.affectedRows + " rows.");
        return res.affectedRows;
      }
    });
  }

};
