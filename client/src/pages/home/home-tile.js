import React, { useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const HomeTile= ({id,type,title,description,userName,likes})=>{
    const [ isMouseOver, setIsMouseOver ]=useState(0);
    const [ isLiked, setIsLiked ]=useState(0);
    
    const updateRef= doc(db,"posts",id);

    const handleLike= async ()=>{
        try{
            if(!isLiked){
                await updateDoc(updateRef,{
                    likes:likes+1,
                })
            }
            else{
                await updateDoc(updateRef,{
                    likes:likes-1,
                })
            }
            setIsLiked(!isLiked);
        }
        catch{
            alert("Could not update likes")
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
                        <div className="absolute bottom-3 right-2 w-7 h-7">
                            <img src="delete-icon.png" onClick={()=>{}} className="hover:cursor-pointer"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}