import express from "express";
import { createTour, deleteTour, getAllTour, getFeaturedTour, getSingleTour, getTourCount, getToursBySearch, updateTour } from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/veryfiToken.js";

const router = express.Router();

//Create new route.
router.post('/', verifyAdmin, createTour);

//Update tour
router.put('/:id', verifyAdmin, updateTour);

//Delete tour.
router.delete('/:id', verifyAdmin, deleteTour);

//Get single tour.
router.get('/:id', getSingleTour);

//Get all tour.
router.get('/', getAllTour);

//Get tour by search.
router.get('/search/getTourBySearch', getToursBySearch);

//Get featured tour 
router.get('/search/getFeaturedTours', getFeaturedTour);

//Get tour count
router.get('/search/getTourCount', getTourCount);

export default router;      