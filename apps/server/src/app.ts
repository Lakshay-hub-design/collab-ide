import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import authRoutes from './modules/auth/auth.routes'
import terminalRoutes from './modules/terminal/terminal.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/run', terminalRoutes)

app.get('/', (req, res) => {
    res.send('Server is running!')
})


export default app