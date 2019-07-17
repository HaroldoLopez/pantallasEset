var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require('ip');
var formidable = require('formidable');
var mysql = require('mysql'); 
var path = require('path');
//const fs = require('fs');
var bodyParser = require('body-parser');
var ejs = require('ejs');


// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

var public = path.join(__dirname, 'public');
//var public = path.join(__dirname, 'uploads');

var ipsPantalla = [
	"::ffff:186.151.61.41",
	"",
	"",
	"",
	"",
	""
];


//Inicialización de variables
var clientes = [];
var con = mysql.createConnection({
  host: "localhost",
  user: "esset",
  password: "esset2019",
  database: "eset_db"
});


//Vistas

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.get('/', function (req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/archivo', function (req, res){
	res.sendFile(__dirname + '/formulario.html');
});

app.get('/refresh', function (req, res){
	res.sendFile(__dirname + '/views/refresh.html');
});

	//Views Pantallas

app.get('/p1', function (req, res){
	var urlPantalla = ""
	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p1%'";
	var arr = []

	con.query(sql, function (err, result) {
		if(result != null){
			efecto = "dos"
			result.forEach(function(elem){
				arr.push(elem.url)
				efecto = elem.efecto
			})
			np = "p1";
			console.log("arreglos:")
			res.render(__dirname + '/views/pantallaVertical', {urls:arr,np:np,efecto:efecto});
		}else
			res.sendStatus(500)
		
	});

});

// app.get('/p2', function (req, res){
// 	var urlPantalla = ""
// 	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p2%'";
// 	var arr = []

// 	con.query(sql, function (err, result) {
// 		if(result != null){
// 			efecto = "dos"
// 			result.forEach(function(elem){
// 				arr.push(elem.url)
// 				efecto = elem.efecto
// 			})
// 			np = "p2";
// 			console.log("arreglos:")
// 			res.render(__dirname + '/views/pantallaVertical', {urls:arr,np:np,efecto:efecto});
// 		}else
// 			res.sendStatus(500)
		
// 	});

// });

// app.get('/p3', function (req, res){
// 	var urlPantalla = ""
// 	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p3%'";
// 	var arr = []

// 	con.query(sql, function (err, result) {
// 		if(result != null){
// 			efecto = "dos"
// 			result.forEach(function(elem){
// 				arr.push(elem.url)
// 				efecto = elem.efecto
// 			})
// 			np = "p3";
// 			console.log("arreglos:")
// 			res.render(__dirname + '/views/pantallaVertical', {urls:arr,np:np,efecto:efecto});
// 		}else
// 			res.sendStatus(500)
		
// 	});

// });



app.get('/p2', function (req, res){
	var urlPantalla = ""
	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p2%'";
	var arr = []

	con.query(sql, function (err, result) {
		if(result != null){
			efecto = "dos"
			result.forEach(function(elem){
				arr.push(elem.url)
				efecto = elem.efecto
			})
			np = "p2";
			console.log("arreglos:")
			res.render(__dirname + '/views/pantallaHorizontal', {urls:arr,np:np,efecto:efecto});
		}else
			res.sendStatus(500)
		
	});

});

app.get('/p3', function (req, res){	
	var urlPantalla = ""
	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p3%'";
	var arr = []

	con.query(sql, function (err, result) {
		if(result != null){
			efecto = "dos"
			result.forEach(function(elem){
				arr.push(elem.url)
				efecto = elem.efecto
			})
			np = "p3";
			console.log("arreglos:")
			res.render(__dirname + '/views/pantallaHorizontal', {urls:arr,np:np,efecto:efecto});
		}else
			res.sendStatus(500)
		
	});

});

// app.get('/p6', function (req, res){
// 	var urlPantalla = ""
// 	var sql = "select e.url as url,p.tipo as efecto from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%p6%'";
// 	var arr = []

// 	con.query(sql, function (err, result) {
// 		if(result != null){
// 			efecto = "dos"
// 			result.forEach(function(elem){
// 				arr.push(elem.url)
// 				efecto = elem.efecto
// 			})
// 			np = "p6";
// 			console.log("arreglos:")
// 			res.render(__dirname + '/views/pantallaHorizontal', {urls:arr,np:np,efecto:efecto});
// 		}else
// 			res.sendStatus(500)
		
// 	});

// });





app.use('/', express.static(public));

//------------------


// Peticiones
app.post('/uploadFile/:tipo/:pantallaOpc', function (req, res){


	var form = new formidable.IncomingForm();
	var nPantalla = req.params.pantallaOpc;
	var tipoFile = req.params.tipo;
	var urlFile = ""

	form.maxFileSize = 6 * 1024 * 1024 * 1024;

    form.parse(req);
    
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/public/uploads/' + file.name;
        urlFile = 'uploads/' + file.name;
    });


    form.on('file', function (name, file){

 		console.log("mostrando tipo de pantalla")
		console.log("nombre: "+nPantalla)
		console.log("ruta: "+urlFile)
		
		idPantalla = 0;

		var sql = "select id from pantallas where nombre like '%"+nPantalla+"%' limit 1";
		con.query(sql, function (err, result) {
			if(result != null){
				idPantalla = result[0].id;
				var sql = "insert into elementos values(null,'"+urlFile+"','imagen',"+idPantalla+")";
				con.query(sql, function (err, result) {
					console.log(result.affectedRows + " record(s) updated");
				});
			}
		});

		band = 0;
		clientes.forEach(function(c,i,array) {
			console.log("Nombre solicitante: "+c.name)
		  	if(c.name == nPantalla){
				io.to(c.id).emit('recargar','hey recarga')
				band = 1;
		  	}
		});
		//--------------------------------------------------

		if(band == 1)
        	res.send(JSON.stringify({"nombre":file.name}));
        else
        	res.sendStatus(404)

    });

    form.on('aborted', () => {
      console.error('Request aborted by the user')
      res.sendStatus(500);
    })

    form.on('error', (err) => {
      console.error('Error', err)
      res.sendStatus(500);
      //throw err
    })   
    

});

app.post('/setEfecto',function(req,res){
	var nPantalla = req.body.nPantalla;
	var sql = "update pantallas set tipo='"+req.body.valor+"' where nombre like '%"+req.body.nPantalla+"%'";
	con.query(sql, function (err, result) {
		if(result != null){
			band = 0;
			clientes.forEach(function(c,i,array) {
				console.log("Nombre solicitante: "+c.name)
			  	if(c.name == nPantalla){
					io.to(c.id).emit('recargar','hey recarga')
					band = 1;
			  	}
			});
			res.send(result)
		}else{
			res.sendStatus(404)
		}
	});
});


app.post('/getEfecto',function(req,res){
	var sql = "select tipo from pantallas where nombre like '%"+req.body.nPantalla+"%'";
	con.query(sql, function (err, result) {
		if(result != null){
			res.send(result)
		}else{
			res.sendStatus(404)
		}
	});
});

app.post('/getImages',function(req,res){
	var sql = "select e.id,e.url from pantallas p inner join elementos e on e.id_pantallas = p.id where p.nombre like '%"+req.body.nPantalla+"%'";
	con.query(sql, function (err, result) {
		if(result != null){
			res.send(result)
		}else{
			res.sendStatus(404)
		}
	});
});

app.post('/delImages',function(req,res){
	var sql = "delete from elementos where id = "+req.body.id;
	var nPantalla = req.body.nPantalla;
	con.query(sql, function (err, result) {
		if(result != null){
			res.send(result)

			band = 0;
			clientes.forEach(function(c,i,array) {
				console.log("Nombre solicitante: "+c.name)
			  	if(c.name == nPantalla){
					io.to(c.id).emit('recargar','hey recarga')
					band = 1;
			  	}
			});

		}else{
			res.sendStatus(404)
		}
	});
});


app.post('/recargar', function(req, res){

	//Seleccionando la pantalla a utilizar
	// pantallaTmp = ""
	// switch(req.body.pantallaOpc){
	// 	case 'p1':
	// 		pantallaTmp = ipsPantalla[0];
	// 	break;
	// 	case 'p2':
	// 		pantallaTmp = ipsPantalla[1];
	// 	break;
	// 	case 'p3':
	// 		pantallaTmp = ipsPantalla[2];
	// 	break;
	// 	case 'p4':
	// 		pantallaTmp = ipsPantalla[3];
	// 	break;
	// 	case 'p5':
	// 		pantallaTmp = ipsPantalla[4];
	// 	break;
	// 	case 'p6':
	// 		pantallaTmp = ipsPantalla[5];
	// 	break;

	// }

	// console.log("mostrando tipo de pantalla")
	// console.log(""+pantallaTmp)

	clientes.forEach(function(c,i,array) {
		console.log("Nombre solicitante: "+c.name)
	  	if(c.name == req.body.pantallaOpc){
			io.to(c.id).emit('recargar','hey recarga')
	  	}
	});
	res.send("recargado")
});

app.get('/getMyIp', function(req, res){
	res.json({"ip":ip.address()})
});


//------------------

//Query a MySQL

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM requerimientos", function (err, result, fields) {
//     if (err) throw err;
//     //console.log(fields);
//   });
// });

//------------------

//Conexión a WebSocket
io.on('connection', function(socket){
		
	console.log("Pantalla conectada:")
	console.log(socket.handshake.query.name);

	ipClient = socket.handshake.address
	idClient = socket.id


	flag = 0;
	clientes.forEach(function(c) {
		if(c.name == socket.handshake.query.name)
			flag ++;
	});

	
	if(flag == 0){
		clientes.push({"id":idClient,"name":socket.handshake.query.name})
	}
	
	console.log(clientes)

	socket.emit('initName', socket.handshake.query.name);

	socket.on('disconnect', function(){
		console.log('Pantalla desconectada:'+socket.handshake.query.name);
		clientes.forEach(function(c,i,array) {
			if(c.name == socket.handshake.query.name)
				clientes.splice(i,1)
		});
	});

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
//------------------