import Post from "../post/Post";
import "./posts.scss";
import React from 'react'

const Posts = () => {
    const posts=[
        {
            id:1,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id: 2,
            name: "Mimi",
            userId: 2,
            profilePic:
                "https://45sknkzlnr.ucarecd.net/96cb48c1-6d45-4252-a5c3-0e9634e6d6fc/-/preview/1000x666/",
            desc: "Whoever built EnMate must be so so handsome I wanna marry him",
        },
        {
            id:3,
            name:"Mimi",
            userId:2,
            profilePic:"https://45sknkzlnr.ucarecd.net/96cb48c1-6d45-4252-a5c3-0e9634e6d6fc/-/preview/1000x666/",
            desc:"Whoever built EnMate must be so so handsome I wanna marry him",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
        {
            id:4,
            name:"Advtik",
            userId:1,
            profilePic:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
            desc:"I love working in Team because its amazing to build new Connections and build amazing products",
            img:"https://45sknkzlnr.ucarecd.net/6b95ea30-d15c-4300-bde6-1248bd3238fc/-/preview/666x1000/",
        },
    ]
  return (
    <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id}></Post>
        ))}
    </div>
  )
}

export default Posts