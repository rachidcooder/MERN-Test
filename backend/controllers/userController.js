import asyncHandler from "express-async-handler";
import User from "../modules/userModule.js"
import generateToken from "../utils/generateToken.js"

//@desc   Auth     user/set token
// route     POST  api/users/auth
//@access   public
const userAuth =asyncHandler( async (req,res) =>{
 const {email,password }=req.body
  
 const user= await User.findOne({email});
       console.log(req.body)
 if(user  &&(await user.matchPassword(password)) ){
  generateToken(res,user._id);

  res.status(201).json({user}
    )}
else{
  res.status(400)
  throw new Error('Invalide email or password  !')
}
});





//@desc       Register user
// route     POST  api/users
//@access   public
const Register =asyncHandler( async (req,res) =>{
  const { name , email ,password }=req.body;

  const ExistUser= await User.findOne({email})
   if(ExistUser){
    res.status(200);
    throw new Error('User already exists !')
   }
const user = await User.create({
  name,email,password
});
  if(user){
    generateToken(res,user._id);
    res.status(201).json({user}
      )}
  else{
    res.status(400)
    throw new Error('Invalide User  !')
  }

  res.status(200).json({message : 'Register user page'});
});






//@desc     Logout user
// route     POST  api/users/logout
//@access   public
const logoutUser =asyncHandler( async (req,res) =>{
  // logged out by desroying cookies 
  res.cookie('jwt','',{
    httpOnly : true,
    expires : new Date(0),
  })

  res.status(200).json({message : 'User logged out '});
});





//@desc        Get user profile
// route     Get  api/users/profile
//@access   private
const getProfile =asyncHandler( async (req,res) =>{
   const  user={
    _id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    
   };

  res.status(200).json({user});
});





//@desc   Update user profile
// route     PUT  api/users/profile
//@access   private
const updateProfile =asyncHandler( async (req,res) =>{
   const user=await User.findOne(req.user._id);

   if(user){
    user.name = req.body.name || user.name ;
    user.email = req.body.email || user.email ;
    if(req.body.password){
      user.password =req.body.password
     }
  const updateUse=await user.save();
    console.log(user);
    res.status(200).json({message : 'update profile  user page',user});
   }else{
    res.status(404);
    throw new Error('User not found')
   }

 
});



export {userAuth , Register ,logoutUser ,getProfile , updateProfile };