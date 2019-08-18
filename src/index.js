const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const multer = require('multer');
const session = require('express-session');
const flash = require('connect-flash');


//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'),'partials'),
    layoutsDir: path.join(app.get('views'),'layouts'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//Middlewares
// Parse URL-encoded bodies (as sent by HTML forms)
// para enviar datos de un form a un controlador :D
app.use(express.urlencoded());

app.use(session({
	secret:'mysecretapp',
	resave: true,
	saveUninitialized:true
}));

app.use(flash());

//Globals Variables
app.use((req,res,next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null; 
	next();
});

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));

//database connection
require('./database');

app.listen(app.get('port'), () => {
    console.log("el twist de luis running on port", app.get('port'));
});