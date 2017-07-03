const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n');
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'DoDo',
    //     hobby: [
    //         'tennis',
    //         'swimming',
    //         'badminton'
    //     ]
    // })
    res.render('home.hbs',{
        windowtitle: 'Home Page',
        pagetitle: 'Home Page',
        pagemsg: 'Welcom to my website',
        currentyear: new Date().getFullYear()
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pagetitle: 'About Page',
        currentyear: new Date().getFullYear()
    });
    // res.send('About Page!!!');
});

app.get('/bad', (req,res) => {
    res.send('404 page not found');
});

app.listen(port, ()=>{
    console.log(`server is up on ${port}`);
});