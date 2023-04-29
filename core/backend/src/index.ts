import express from 'express'
import cors from 'cors'
import Task from './routes/task.js'

const app=express()
const PORT=8000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/',Task)
app.listen(PORT,()=>{
    console.log(`Server running on port#${PORT}`)
})