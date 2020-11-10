import jwt from 'jsonwebtoken'
import aAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = aAsyncHandler(async (req, res, next) => {
    let token

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

    // commented out this next() as it would trigger HEADER issue
    // common stack overflow issue
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // next()
})

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(404)
        throw new Error('Not authorized as an admin.')
    }
}

export { protect, admin }
