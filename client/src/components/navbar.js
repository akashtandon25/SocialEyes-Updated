import React, { useState, useEffect, useContext } from "react";
import { appContext } from "../App";
import { auth, provider } from '../config/firebase';
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Navbar= ({user})=>{
    const { refresh, setRefresh }= useContext(appContext);
    const navigate= useNavigate();
    const [ myLikes, setMyLikes ]=useState(0);
    const [ myPosts, setMyPosts ]=useState(0);
    const signIn= async ()=>{
        const res= await signInWithPopup(auth,provider);
    }
    useEffect(()=>{
        if(user){
            fetchLikes();
            fetchPosts();
        }
    },[user,refresh])

    const fetchLikes= async ()=>{
        try{
            const likesRef= collection(db,"likes");
            const likesList= await getDocs(query(likesRef, where("userId","==",user.uid)));
            setMyLikes(likesList.docs.length);
        }
        catch{
            alert("Unable to fetch number of likes");
        }
    }

    const fetchPosts= async ()=>{
        try{
            const postsRef= collection(db,"posts");
            const postsList= await getDocs(query(postsRef, where("userId","==",user.uid)));
            setMyPosts(postsList.docs.length);
        }
        catch{
            alert("Unable to fetch number of posts");
        }
        
    }

    const signout= async ()=>{
        await signOut(auth);
        navigate('/');
    }
    return (
        user
        ?<div className="w-1/5 my-5 mx-4 h-auto bg-red-700 rounded-md py-3">
            <div className="h-3/4">
                <p className="font-bold text-3xl text-left mx-5 my-3">SocialEyes</p>
                <div className="flex justify-center pt-6 pb-2"><img src={user.photoURL} className="rounded-full"/></div>
                <p className="font-bold text-xl">{user.displayName}</p>
                <div className="flex justify-around py-10">
                    <div>
                        <p className="font-semibold text-3xl">{myPosts}</p>
                        <p className="text-sm font-semibold">Posts</p>
                    </div>
                    <div>
                    <p className="font-semibold text-3xl">{myLikes}</p>
                    <p className="text-sm font-semibold">Liked</p>
                    </div>
                </div>
                <div className="h-max w-full">
                </div>
            </div>
            <div className="flex flex-col justify-end pb-2 h-1/4 w-full">
                    <div className="font-semibold text-lg flex justify-start" onClick={()=>navigate('/')}>
                        <div className="py-2 px-3 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                                <path d="M19 9L19 17C19 18.8856 19 19.8284 18.4142 20.4142C17.8284 21 16.8856 21 15 21L14 21L10 21L9 21C7.11438 21 6.17157 21 5.58579 20.4142C5 19.8284 5 18.8856 5 17L5 9" stroke="#323232" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M3 11L7.5 7L10.6713 4.18109C11.429 3.50752 12.571 3.50752 13.3287 4.18109L16.5 7L21 11" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10 21V17C10 15.8954 10.8954 15 12 15V15C13.1046 15 14 15.8954 14 17V21" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <button className="hover:text-red-400 w-1/3 text-left py-1">Home</button>
                    </div>
                    <div className="font-semibold text-lg flex justify-start" onClick={()=>navigate('/post')}>
                        <div className="py-2 px-3 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="30px" height="30px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" overflow="inherit"><path d="M2.941 8c-2.941 0-1.47.779 0 1.974l22.059 16.789 22.059-16.737c1.472-1.195 2.941-2.026 0-2.026h-44.118zm-2.941 3.946v24.728c0 1.455 1.488 3.326 2.665 3.326h44.67c1.178 0 2.665-1.871 2.665-3.326v-24.728l-25 19.075-25-19.075z"/></svg>
                        </div>
                        <button className="hover:text-red-400 w-1/3 text-left py-1">Post</button>
                    </div>
                <div className="font-semibold text-lg flex justify-start" onClick={signout}>
                        <div className="py-2 px-3 hover:cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                                <path d="M21 12L13 12" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 5V4.5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19.5V19" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <button className="hover:text-red-400 w-1/3 text-left py-1">Signout</button>
                </div>
            </div>
        </div>
        :<div className={"w-96 mt-20 mx-10 h-5/6 bg-blue-300 rounded-md py-3"}>
            <div className="h-full py-5">
                <p className="font-bold text-3xl underline text-red-700 h-1/4">SocialEyes</p>
                <div className="h-3/4">
                    <button className="align-bottom px-4 py-2 bg-red-500 rounded text-white font-semibold hover:bg-red-700" onClick={signIn}>Sign in With Google</button>
                </div>
            </div>
        </div>
    );
}

//