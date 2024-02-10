import express from 'express';
import { StatusCodes } from 'http-status-codes';
import verifyToken from '../middleware/auth.js';
import User from '../models/userModel.js';

const dashboardRouter = express.Router()


dashboardRouter.get('/', verifyToken, async (req, res) => {
    const userId = req.tokenId

    try {
        const user = await User.findById(userId).populate('bookings')
        res.status(StatusCodes.OK).json(user)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }

    
})


export default dashboardRouter