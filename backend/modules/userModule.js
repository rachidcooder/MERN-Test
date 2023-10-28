import mongoose from "mongoose";
import bcrypt from "bcryptjs";


 const userSchema=mongoose.Schema({
   name:{
    type : String ,
    require : true

   },
   email:{
    type : String ,
    unique : true,
    require : true

   },
   password:{
    type : String ,
    require : true

   }
 },
 {timestamps : true
}
 );

 userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt=await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password,salt);
 });

   userSchema.methods.matchPassword = async function (enterdPassword){
    return await bcrypt.compare(enterdPassword,this.password)
   }


const User = mongoose.model('User',userSchema);
 export default User ;