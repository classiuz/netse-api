import cors from 'cors'
import { ALLOWED_ORIGINS } from '@/config/environment'

const allowedOrigins = ALLOWED_ORIGINS?.split(', ')

const corsMiddleware = () => cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
})

export default corsMiddleware
