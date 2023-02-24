const express = require('express');
const router = express.Router();
const User = require('../model/users');

router.get('/',(req,res)=>{
User.find().exec((err,users)=>{
    if(err){
        res.json({message:err.message})
    }else{
        res.render('index',{
            title:'home page',
            users:users,
        })
    }
})
})

router.get('/add',(req,res)=>{
    res.render('add_users' , {title:' add users'})
})

router.post('/add',  (req,res)=>{

    const user = new User({
        name: req.body.name,
        age: req.body.age,
        course: req.body.course,
        passoutyear: req.body.passoutyear,
    });
user.save((err)=>{
    if(err){
        res.json({message:err.message ,type:'danger'})
    }else{
        res.redirect('/');
    }
});


})

router.get('/edit/:id', async (req,res) => {
    const user = await User.findById(req.params.id)
    res.render('edit_users',{ user: user})
})

router.post ('/update/:id', (req, res) => {
        let id =req.params.id;
       User.findByIdAndUpdate(id ,{
        name:req.body.name,
        age:req.body.age,
        course:req.body.course,
        passoutyear:req.body.passoutyear,
       },(err,result)=>{
        if(err){
            res.json({message:err.message,type:'danger'})
        }else{
            res.redirect('/');
        }
       })
        });

        router.get('/delete/:id', async (req,res) =>{
            await User.findByIdAndRemove(req.params.id)
            res.redirect('/')
           })

module.exports= router;
