import express, { Router } from "express";
import { userAuth, 
        Register ,logoutUser
            ,getProfile , updateProfile } from "../controllers/userController.js";
import {protect} from "../middlware/authMidllware.js"
const router=express.Router();


router.post('/',Register);
router.post('/auth',userAuth);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getProfile).put( protect, updateProfile);




export default router;






