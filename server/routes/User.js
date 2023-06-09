const router = require("express").Router();
const User = require("../models/User.js");
const mongoose = require("mongoose");
const { findById } = require("../models/User.js");
const {uid} = require('uid')
const bcrypt = require("bcryptjs");

//Acc Find

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

//ADD User
router.put("/add/:id", async (req, res) => {
  try {
    const { name, image } = req.body;
 
    const user = await User.findById(req.params.id);
    if(user.users.length >2){
      res.status(500).send("Malesef En fazla 3 kullanici acilabilir");
    }else{
      const newUser = await User.findByIdAndUpdate(req.params.id, {
        users: [
          ...user.users,
          {
            id:uid(),
            name: name,
            image: image,
            favorites: [],
          },
        ],
      });
      res.status(200).send("New user has been add");
    }
   
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//GET all Favorites movies
router.get("/favorites/:id",async(req,res)=>{
  try{
    const id=req.params.id;
    console.log(id)
    const user=await User.findById(id);
    res.status(200).json({
      message:"success",
      total:user.favorites.length,
  favorites:user.favorites
    })
  }catch(e){
    console.log(e)
    res.status(500).json({
      message: "error",
    })
  }

})
//DELETE Favorites Movies
router.delete("/favorites/:id",async(req,res)=>{
  try{

 const id=req.params.id;
    console.log("id",id)
    console.log("movieid",req.body)
    const user=await User.findById(id);
    const result = await user.updateOne({$pull:{favorites:req.body.movieId}})
res.status(200).send("successfully deleted");

  }catch(e){
    console.log(e)
  }
})

//FAV ADD
router.post("/favAdd/:id",async(req,res)=>{
    try {
        const {movie,userId}= req.body;
        console.log(userId);
    
       
        const acc = await User.findById(req.params.id);
        // const user = await acc.users.filter(i=> i.id === userId)
        console.log(acc);
        const result = await acc.updateOne({$push:{favorites:movie}})
      res.status(200).send("success")
        return;
        if(movieFind){
            const otherUsers = await acc.users.filter(i=> i.id !== userId)
            const newUserFavs = await user[0].favorites.filter(i=> i.id !== movie.id)
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                users:otherUsers
            })
            const accNew = await User.findById(req.params.id);
         
            const newUser = await {
                id:user[0].id,
                name:user[0].name,
                image:user[0].image,
                favorites:newUserFavs
            }
            
        }else{
            const otherUsers = await acc.users.filter(i=> i.id !== userId)
            const newUserFavs = await [...user[0].favorites,movie]
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                users:otherUsers
            })
            const accNew = await User.findById(req.params.id);
         
            const newUser = await {
                id:user[0].id,
                name:user[0].name,
                image:user[0].image,
                favorites:newUserFavs
            }
            const addNewUser = await User.findByIdAndUpdate(req.params.id,{
                users: [...accNew.users,newUser]
            })
            const resultUser = await User.findById(req.params.id)
            res.status(200).send(resultUser)
        }
     
    } catch (error) {
console.log(error.message)
        res.status(500).send(error.message)
    }
  
})

//ACC edit
router.put("/acc/edit/:id",async(req,res)=>{
 try {
  const {password} = req.body
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
   const user = await User.findByIdAndUpdate(req.params.id,{
    password:hashedPassword
   })
   res.status(200).send("Sifre guncellendi")
 } catch (error) {
  res.status(500).send(error)
 }
    
})
//USER EDIT
router.put("/user/edit/:id",async(req,res)=>{
  try {
   const {name,image,userId} = req.body
    const user = await User.findById(req.params.id)
    const singleUser = await user.users.filter(i=> i.id === userId)
    const newUser = await {
      id: singleUser[0].id,
      name: name,
      image:image,
      favorites:singleUser[0].favorites
    }
    const otherUsers = await user.users.filter(i=> i.id !== singleUser[0].id)
   const accUpdate = await User.findByIdAndUpdate(req.params.id,{
        users:otherUsers
   })
   const userNew = await User.findById(req.params.id)
   const accUpdate2 = await User.findByIdAndUpdate(req.params.id,{
    users:[...userNew.users,newUser]
})

  
    res.status(200).send("Kullanici Guncelledi")
  } catch (error) {
   res.status(500).send(error.message)
  }
     
 })
module.exports = router;
