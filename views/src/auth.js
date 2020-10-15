import back from "hosts.js"


const isAuthenticated = {
    isAuthro: false,
    authenticateRo(){
      const request = require('request');
      let options = {};
      options = {
        uri: back + '/superusers/checkToken/ro',
        withCredentials: true
      }
      request.post(options, (err, res, body) => {
      if (err) {
          return console.log(err);
      }
      if(res.statusCode === 200){
        this.isAuthro = true;
        console.log(this.isAuthro);
      }
      else if (res.statusCode === 401){
        this.isAuthro = false;
      }
      });
    },
    getAuthRo(){
        console.log(this.isAuthro);
        return this.isAuthro;
    },
    setRo(){
        this.isAuthro = true;
    },
    signoutRo(){
        this.isAuthro = false;
    },
    isAuthss: false,
    authenticateSs(){
      const request = require('request');
      let options = {};
      options = {
        uri: back + '/superusers/checkToken/ss',
        withCredentials: true
      }
      request.post(options, (err, res, body) => {
      if (err) {
          return console.log(err);
      }
      if(res.statusCode === 200){
        this.isAuthss = true;
        console.log(this.isAuthss);
      }
      else if (res.statusCode === 401){
        this.isAuthss = false;
      }
      });
    },
    getAuthSs(){
        console.log(this.isAuthss);
        return this.isAuthss;
    },
    setSs(){
        this.isAuthss = true;
    },
    signoutSs(){
        this.isAuthss = false;
    }
  }


export default isAuthenticated;