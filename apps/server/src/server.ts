import dotenv from 'dotenv'
dotenv.config()

import http from 'http'

import app from './app'
import connectDB from './config/db'

import { initilizeSocket } from './sockets'

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try{
        await connectDB()

        const server = http.createServer(app)

        initilizeSocket(server)

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch(err){
        console.error('Failed to start server:', err)
        process.exit(1)
    }
}

startServer()