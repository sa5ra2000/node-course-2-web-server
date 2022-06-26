const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.port || 3000;

var app = express();

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to add');
        }
    });
    next();
});

//bngarab lw 3mlna use b next parameter w masta5demna4 nexat eh elly haye7sal..
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
//msh haye7al run lly gy koloh.

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

// app.get('/', (req, res) => {
//     //res.send('<h1> Hello Express ! </h1>');
//     res.send({
//         name: 'yousef',
//         likes: [
//             'bikes', 'cities'
//         ]
//     });
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        PageTitle: 'Home Page',
        WelconeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        PageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Somthing went wrong..'
    });
});

app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});

