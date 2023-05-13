const {Router} = require('express');
const router = Router();
const fs = require('fs');
const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books= JSON.parse(json_books);

const {"v4": uuid} = require('uuid');



router.get('/',(req,res) =>{
    res.render('index.ejs',{
        books
    })
});

router.get('/new-entry',(req,res) =>{
    res.render('new-entry')

});

router.post('/new-entry',(req,res) =>{
    const {title, autor, imagen, description} = req.body;
    if(!title|| !autor|| !imagen|| !description){
        res.status(400).send("Las entradas deben tener nombre y descripción")
        return;
    };
    
    let newBook={
        id: uuid() ,
        title,
        autor,
        imagen,
        description
    }

    books.push(newBook);
    
    const json_books = JSON.stringify(books);

    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req,res) => {
    books = books.filter(books => books.id !=req.params.id);
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
    res.redirect('/');
});

module.exports = router;
