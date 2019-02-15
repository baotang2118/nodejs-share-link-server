const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const os = require('os');
const querystring = require('querystring');
const sql = require('./sql');

http.createServer(function (req, res) {
	interfaces = os.networkInterfaces();
	var addresses = "";
	for (var k in interfaces) {
		for (var k2 in interfaces[k]) {
			var address = interfaces[k][k2];
			if (address.family === 'IPv4' && !address.internal) {
				addresses += address.address;
				addresses += "<br>";
			}
		}
	}
	var q = url.parse(req.url, true);
	var filename = "";
	sql.EstablishConnection();
	if (req.method === 'POST' && req.headers['content-type'] === "application/x-www-form-urlencoded") {
        var commingData = "";
		req.on('data', (chunk) => {
			commingData += chunk.toString();
		});
		req.on('end', () => {
			var parsedData = querystring.parse(commingData);
			//console.log(parsedData);
			if(parsedData.link){
				sql.InsertRecord(parsedData.link);
				filename = "./index.html";
				fs.readFile(filename, function(err, data) {
					if (err) {
						res.writeHead(404, {'Content-Type': 'text/html'});
						return res.end("<h1>404 Not Found</h1>");
					}
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(data);
					return res.end();
				});
			}
			if(parsedData.loadLinkTable){
				sql.SelectRecord(function(out){
					//console.log("from server", out);
					res.writeHead(200, {'Content-Type': 'text/html'});
					for(var i=0; i <out.length;i++){
						let str = "<a href='";
						str += out[i].link;
						str += "' target='_blank'>";
						str += out[i].link;
						str += "</a>";
						res.write(str);
						res.write("<br>");
				}
					return res.end();
				});
			}
			if(parsedData.Logo){
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(addresses.toString());
				return res.end();
			}			
		});
	}
	else{
		switch(q.pathname){
			case "/":
			case "/index.html":
				filename = "./index.html";
				fs.readFile(filename, function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					return res.end("<h1>404 Not Found</h1>");
				}
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data);
				return res.end();
				});
				break;
			case "/img/chartreux.jpg":
				filename = "./img/chartreux.jpg";
				fs.readFile(filename, function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					return res.end("<h1>404 Not Found</h1>");
				}
				res.writeHead(200, {'Content-Type': 'image/jpeg'});
				res.write(data);
				return res.end();
				});
				break;
			case "/css/w3.css":
				filename = "./css/w3.css";
				fs.readFile(filename, function(err, data) {
				if (err) {
					res.writeHead(404, {'Content-Type': 'text/html'});
					return res.end("<h1>404 Not Found</h1>");
				}
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.write(data);
				return res.end();
				});
				break;
			default:
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("<h1>404 Not Found</h1>");
				break;
		}
	}
}).listen(8080);