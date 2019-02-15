const mysql = require('mysql');

var con;
exports.EstablishConnection = function(){
	con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "mydb"
	});
}

exports.InsertRecord = function(input){
	con.connect(function(err) {
	  if (err) throw err;
	  //console.log("Connected!");
	  var sql = "INSERT INTO linkphim (link) VALUES ('" + input + "');";
	  con.query(sql, function (err, result) {
		if (err) throw err;
		//console.log("1 record inserted");
	  });
	});
}

exports.SelectRecord = function(callback){
	con.connect(function(err) {
		if (err) throw err;
		var sql = "SELECT link FROM linkphim ORDER BY id DESC LIMIT 5;";
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			//console.log("from sql", result);
			return callback(result);
		});
	});
}

/*
CREATE DATABASE mydb;
USE mydb;
CREATE TABLE linkphim (id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, link TEXT NOT NULL);
DELETE FROM linkphim;

@reboot cd /home/pi/"nodejs share-link-server"/ && /usr/bin/node /home/pi/"nodejs share-link-server"/server.js
*/