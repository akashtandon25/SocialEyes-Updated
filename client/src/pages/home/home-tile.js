import React, { useContext, useEffect, useState } from "react";
import { addDoc, getDocs, collection, deleteDoc, doc, query, where, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { appContext } from "../../App";
import { ref } from "firebase/storage";

export const HomeTile= ({userid,postUser,id,type,title,description,userName,time})=>{
    const [ isMouseOver, setIsMouseOver ]=useState(0);
    const [ isLiked, setIsLiked ]=useState(false);
    const {refresh,setRefresh}= useContext(appContext);
   
    const likesRef= collection(db,"likes");

    useEffect(()=>{
        initialiseLike();
    },[])

    const initialiseLike= async ()=>{
        const likeQueryRef= query(likesRef,where("userId",'==',userid),where("postId","==",id));
        const likeArray= await getDocs(likeQueryRef);
        setIsLiked(likeArray.docs.length);
    }

    const handleLike= async ()=>{
        try{
            const likeArray= await getDocs(query(likesRef,where("postId","==",id)));
            if(!isLiked){
                const addLike= await addDoc(likesRef,{
                    'userId':userid,
                    'postId':id,
                });
            }
            else{
                const likeQueryRef= query(likesRef,where("userId",'==',userid),where("postId","==",id));
                const deleteQueryRef= await getDocs(likeQueryRef);
                deleteQueryRef.forEach(async (document)=>{
                    await deleteDoc(document.ref);
                });
            }
            setIsLiked(!isLiked);
            setRefresh(!refresh)
        }
        catch{
            alert("Could not update likes");
        }
    }

    const handleDelete= async ()=>{
        try{
            const deletedPostLikeRef= query(likesRef,where("postId","==",id));
            const deletedPostLikeArray= await getDocs(deletedPostLikeRef);
            deletedPostLikeArray.forEach(async (document)=>{
                await deleteDoc(document.ref);
            })
            const deleteRef= doc(db,"posts",id);
            await deleteDoc(deleteRef);
            setRefresh(!refresh);
        }
        catch(error){
            console.log(error);
            alert("Could not Delete Post");
        }
    }

    return(
        <div onMouseOver={()=>setIsMouseOver(1)} onMouseOut={()=>setIsMouseOver(0)} className={
        isMouseOver?"h-full w-full mx-1 my-1 rounded-lg text-sm flex align-center items-center bg-gray-900"
        :type==='image'?"h-full w-full mx-1 my-1 rounded-lg text-sm flex align-center items-center"
        :"h-full w-full px-2 py-2 mx-1 my-1 rounded-lg text-sm bg-gradient-to-br from-orange-300 via-orange-600 to-red-400 flex align-center items-center"}>
            {!isMouseOver?  
                type==='image'
                ?<img src={description} className="h-full w-full rounded-lg"/>
                :<p className={description.length>100?"text-center w-full font-semibold h-max text-xl"
                :description.length>50?"text-center w-full font-semibold h-max text-2xl"
                :"text-center w-full font-semibold h-max text-4xl"
            }>{description}</p>
                :<div className="w-full h-full relative z-0">
                    <div className="w-full h-full flex items-center justify-center blur-lg">
                        {type==='image'
                            ?<img src={description} className="h-full w-full rounded-lg"/>
                            :<p className={description.length>100?"text-center w-full font-semibold h-max text-xl"
                            :description.length>50?"text-center w-full font-semibold h-max text-2xl"
                            :"text-center w-full font-semibold h-max text-4xl"
                        }>{description}</p>
                        }
                    </div>
                    <div className="absolute h-full w-full inset-0 z-10 flex justify-center items-center">
                        <p className="font-bold text-2xl px-2 py-2 text-white">{title}</p>
                        <div className="absolute bottom-3 left-3 w-7 h-7">
                            {!isLiked
                                ?<img src="heart-white.png" onClick={handleLike} className="hover:cursor-pointer"/>
                                :<img src="heart-red.png" onClick={handleLike} className="hover:cursor-pointer"/>
                            }
                        </div>
                        <div className="absolute inset-x-10 bottom-3 text-lg font-semibold text-white align-text-bottom">
                            {userName}
                        </div>
                        {userid===postUser&&
                            <div className="absolute bottom-3 right-2 w-7 h-7">
                                <img src="delete-icon.png" onClick={handleDelete} className="hover:cursor-pointer"/>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}