import { response } from "express";
import Booking from "../models/Bookings.js";

// create new booking
export const createBooking = async (request, response) => {

    const newBooking = new Booking(request.body);
    
    try{
        const savedBooking = await newBooking.save();
        response.status(200).json({success: true, message: "Your tour is booked", data: savedBooking});    
    }catch(error){
        response.status(500).json({success: false, message: "Internal server error"});   
    }
}

// get single booking 
export const getBooking = async (request, response) => {
    const id = request.params.id;
    try{
       const book = await Booking.findById(id);
       response.status(200).json({success: true, message: "Sucessfully", data: book}); 
    }catch(error){
        response.status(404).json({success: true, message: "Internal server error"});
    }
}

// get all booking
export const getAllBooking = async (request, response) => {
    try{
        const books = await Booking.find();
        response.status(200).json({sucess: true, message: "Sucessfully", data: books});
    }catch(error){
        response.status(500).json({success: false, message: "Not found."});   
    }
}