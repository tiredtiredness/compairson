import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import listRoutes from './features/lists/list.routes.js'
import itemRoutes from './features/items/item.routes.js'
import userRoutes from './features/users/user.routes.js'
import authRoutes from './features/auth/auth.routes.js'
import { protect } from './middleware/auth.js'
import passport from './configs/passport.js'

const app = express()

// Middleware
app.use(cors({ credentials: true }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use('/api/lists', protect, listRoutes)
app.use('/api/items', protect, itemRoutes)
app.use('/api/users', protect, userRoutes)
app.use('/auth', authRoutes)

export default app
