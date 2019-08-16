const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const multer = require('multer');

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

//routes
app.use(require('./routes/index'));

//database connection
require('./database');

app.listen(app.get('port'), () => {
    console.log("el twist de luis running on port", app.get('port'));
});