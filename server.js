var port = 8000;

var sockIO = require('socket.io');
var connect = require('connect');

var website = connect().use(connect.static('site')).listen(port);
var server = sockIO.listen(website, {log:false});

var conexiuni = [];

server.on('connection', function(socket){
	var obj;
	
	socket.on('nume', function(nume){
		obj = {"nume":nume, "sock":socket};
		conexiuni.push(obj);
	});
	
	socket.on('disconnect', function(){
		var i = conexiuni.indexOf(obj);
		delete conexiuni[i];
		conexiuni.splice(i,1);
	});
	
	socket.on('send', function(msg){
		for(var i=0;i<conexiuni.length;i++)
			if(conexiuni[i])
				conexiuni[i].sock.emit('get', {"nume":obj.nume, "msg":msg});
	});
	
});