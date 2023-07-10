import React, { useState,useEffect,useContext } from "react";
import { db } from "../../config/firebase";
import {getDocs,collection,query,where} from "firebase/firestore";
import { HomeTile } from "./home-tile";
import { appContext } from "../../App";

export const Home= ({user})=>{
    const { refresh, setRefresh }=useContext(appContext);
    const [ posts, setPosts ]=useState([]);
    const postsRef= collection(db,"posts");

    useEffect(()=>
    {
        if(user){
            console.log(user);
            try{
                getPosts();
            }
            catch(error){
                alert(error);
            }
        }
    },[user,refresh])


    const likesRef= collection(db,"likes");
    const getPosts= async ()=>{
        const data= await getDocs(postsRef);
        setPosts(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
    };
    return (
        <div className="px-8 py-10 h-full w-full grid grid-cols-3 grid-rows-3 gap-2">
            {user&&
                posts.map((post)=>{
                    return <HomeTile key={post.id} userid={user.uid} postUser={post.userId} id={post.id} type={post.type} title={post.titleText} description={post.type==='image'?post.image:post.descriptionText} userName={post.userName} time={post.time}/>
                })
            }
        </div>
    );
}