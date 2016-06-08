var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});


// Socket.io server listens to our app
var io = require('socket.io').listen(app);

//Add colors 
var colors = ["violet","indigo","blue","green","yellow","orange","red"];


var members = {};
// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { colors: colors, id: socket.id });
    
    socket.on('submitcircle', function(data){
    	socket.name = data.name;
    	socket.color = data.color;
    	                                              
       //Add member to socket
       socket.join(socket.name);
       
       var x = Math.random() * (1024 - 1) + 1;
       var y = Math.random() * (800 - 1) + 1;
       members[socket.name] = {'name':socket.name, 'color':socket.color, 'x':x, y:y};       

       socket.emit('showcircle', {members: members, me:members[socket.name]});

       socket.broadcast.emit('reloadcircle', {members: members});

       console.log(members);
    });

    socket.on('circlemove', function(data){
    	members[data.name].x = data.x; 
    	members[data.name].y = data.y;
    	console.log(members);
		socket.broadcast.emit('reloadcircle', {members: members});    	 
    });
	  
	  // **** when the user disconnects.. perform this **** //
	  socket.on('disconnect', function () {	    	      	      
	  		delete members[socket.name];
			socket.broadcast.emit('reloadcircle', {members: members});	          
	        socket.leave(socket.name);	      	    
	  });



});

app.listen(3000);
