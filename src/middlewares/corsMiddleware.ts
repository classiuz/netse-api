import cors from 'cors'
import { ALLOWED_ORIGINS } from '@/lib/environment'
import { GENERAL_MESSAGES } from '@/lib/messages'

const allowedOrigins = ALLOWED_ORIGINS?.split(', ')

const corsMiddleware = () => cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins?.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(GENERAL_MESSAGES.CORS_ERROR))
    }
  }
})

export default corsMiddleware
