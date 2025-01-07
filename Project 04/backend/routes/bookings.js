import express from "express";
import { verifyAdmin, verifyUser } from "../utils/veryfiToken.js";
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingsController.js";

const router = express.Router();

router.post('/',  verifyUser, createBooking);

router.get('/:id', verifyUser, getBooking);

router.get('/', verifyAdmin, getAllBooking); 

export default router;