import React, { useState,useEffect } from "react";
import { db } from "../../config/firebase";
import {getDocs,collection, doc} from "firebase/firestore";
import { HomeTile } from "./home-tile";

export const Home= ({user})=>{
    const [ posts, setPosts ]=useState([]);
    const postsRef= collection(db,"posts");
    const getPosts= async ()=>{
        const data= await getDocs(postsRef);
        var arr=[];
        arr=data.docs.map((doc)=>({...doc.data(),id:doc.id}));
        arr.sort((a,b)=>a.time<b.time);
        setPosts(arr);
    };
    useEffect(()=>{getPosts()},[]);
    useEffect(()=>console.log(posts),[posts])
    return (
        <div className="px-8 py-10 h-full w-full grid grid-cols-3 grid-rows-3 gap-2">
            {
                posts.map((post)=>{
                    return <HomeTile key={post.id} id={post.id} type={post.type} title={post.titleText} description={post.type==='image'?post.image:post.descriptionText} userName={post.userName} likes={post.likes}/>
                })
            }
        </div>
    );
}