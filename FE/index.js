const socket = io('http://localhost:3000')

let posts =[]

socket.emit('getPosts',{})

socket.on('RetrievePosts',(data)=>{
    posts=data.posts
    displayPosts()
    
})

socket.on('newPost',(data)=>{
    posts.push(data.post)
    displayPosts()
})

const displayPosts=()=>{
    const postsArea = document.querySelector('#posts-area')
    let cartoona = ''

    posts.forEach(post=>{
        cartoona+=`
        <div class="card text-left">
          <div class="card-body">
            <h4 class="card-title"> ${post.title} </h4>
            <p class="card-text">${post.content}</p>
          </div>
        </div>`

    })
    postsArea.innerHTML = cartoona



    
}

const handleAddPost=(event)=>{
    event.preventDefault()
    const formData= new FormData(event.target)
    const title = formData.get('title')
    const content =formData.get('content')
    socket.emit('addPost',{title,content})
}
