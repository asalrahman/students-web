const express = require('express');
const router = express.Router();
const User = require('../model/users');



router.get('/',async(req,res)=> {
    try {
        const users = await User.find();
         res.render('index',{title:"home page",
         users:users});

    } catch (error) {
        res.json({message:error.message,type:"danger"})
    }


});



router.get('/add',(req,res)=>{
    res.render('add_users' , {title:' add students'})
})


router.post('/add', async (req, res) => {
    const { name, age, course, passoutyear } = req.body;
    const user = new User({ name, age, course, passoutyear });
  
    try {
      await user.save();
      res.redirect('/');
    } catch (err) {
      res.json({ message: err.message, type: 'danger' });
    }
  });
  



router.get('/edit/:id', async (req,res) => {
    const user = await User.findById(req.params.id)
    res.render('edit_users',{ user: user})
})



router.post('/update/:id', async (req, res) => {
    try{
      const { name, age, course, passoutyear } = req.body;
      const id = req.params.id;
  
      await  User.findByIdAndUpdate(id, { name, age, course, passoutyear });
      res.redirect('/');
    } catch (err) {
      res.json({ message: err.message,
         type: 'danger' });
    }

  });


  
        router.get('/delete/:id', async (req,res) =>{
            await User.findByIdAndRemove(req.params.id)
            res.redirect('/')
           })

module.exports= router;
