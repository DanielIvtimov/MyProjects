import express from "express";
import { updateUser, deleteUser, getSingleUser, getAllUser  } from "../controllers/userController.js";
import {verifyUser, verifyAdmin} from "../utils/veryfiToken.js";

const router = express.Router();

//Update user
router.put('/:id', verifyUser, updateUser);

//Delete user.
router.delete('/:id', verifyUser, deleteUser);

//Get single user.
router.get('/:id', verifyUser, getSingleUser);

//Get all users.
router.get('/', verifyAdmin, getAllUser);

export default router;