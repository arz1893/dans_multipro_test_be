import express from 'express'
import dotenv from 'dotenv'
import router from './router'
import cors from 'cors'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use(router)

app.listen(4000, () => {
    console.log('App running on port 4000')
})
