const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render('index',{files:files});
    })   
})


app.get('/files/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){   
         res.render('show',{filename:req.params.filename,filedata:filedata});
    });
})

app.get('/rename/:filename',function(req,res){
    res.render('rename',{filename:req.params.filename});
})

app.post('/delete/:filename',function(req,res){ 
    fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect('/');
    })
})

app.post('/rename',function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect('/');
    })
    
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('').toLowerCase()}.txt`,req.body.details,function(err){
        res.redirect('/');
    })
})

app.listen(3000);