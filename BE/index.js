import express  from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io'
import ConnectToDB from './db/connection.js'
import PostModel from './models.js'




const app = express()
const server = createServer(app)
const port = 3000
const io = new Server(server,{
    cors:{
        origin:"*",
    },
})


ConnectToDB()
io.on('connection', (socket) => {
    console.log('a user connected')
    console.log(socket.id)
    // socket.emit('HelloFromBE',{message:'Hello From BE '})
   socket.on('getPosts',async()=>{
       const posts = await PostModel.find()
       socket.emit('RetrievePosts',{posts})
   })

   socket.on('addPost',async(data)=>{
    const {title,content}= data
    const post = await PostModel.create({title,content})
    io.emit('newPost',{post})
    })
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))