import React, { useContext, useEffect } from "react";
import { appContext } from "../App";
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Navbar= ()=>{
    const user= useContext(appContext);
    const navigate= useNavigate();
    const signIn= async ()=>{
        const res= await signInWithPopup(auth,provider);
        navigate('/home');
    }
    return (
        <div className={user?"w-1/4 mt-20 mx-10 h-5/6 bg-blue-400 rounded-md py-3":"w-96 mt-20 mx-10 h-5/6 bg-blue-300 rounded-md py-3"}>
            {user
            ?<div>

            </div>
            :<div className="h-full py-5">
                <p className="font-bold text-3xl underline text-red-700 h-1/4">SocialEyes</p>
                <div className="h-3/4">
                    <button className="align-bottom px-4 py-2 bg-red-500 rounded text-white font-semibold hover:bg-red-700" onClick={signIn}>Sign in With Google</button>
                </div>
            </div>
            }
        </div>
    );
}