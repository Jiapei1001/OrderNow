import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleWare.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import path from 'path'

dotenv.config()

connectDB()

const app = express()

// add morgan to print out api in console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// accept json file in the body for user authentication
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// paypal
app.get('/api/config/paypal', (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// prepare production mode
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

// imported from errorMiddleWare.js to handle error messages
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
    )
)
