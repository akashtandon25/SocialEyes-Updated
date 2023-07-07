import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ImageUploader } from "../../components/image-uploader";
import { AlertDialogue } from "../../components/alert";


export const PostModel= ({user})=>{
    const [ modeIsImage, setModeIsImage ]=useState(0);
    const [ titleText, setTitleText ]=useState("");
    const [ descriptionText, setDescriptionText ]=useState("");
    const [ image, setImage ]=useState(null);
    const [ errorStatus, setErrorStatus ]=useState(null);
    const [ alertStatus, setAlertStatus ]=useState(false);

    
    const postsref= collection(db,"posts");
    const handleSubmit= async ()=>{
        try{
            await addDoc(postsref,{
                type:modeIsImage?'image':'text',
                titleText:titleText,
                descriptionText:descriptionText,
                image:image,
                username:user.displayName,
                userid:user.uid,
            });
            setImage(null);
            setTitleText("");
            setDescriptionText("");
        }
        catch(error){
            alert(error);
        }
    }
    
    const closeAlert= ()=>{
        setAlertStatus(false);
        setImage(null);
    }

    return( 
        <div className="flex justify-center pt-12 h-full w-full">
            <div className="h-5/6 w-3/4 rounded-lg bg-gray-300 py-7 px-5">
                <form className="h-full w-full">
                    <div className="flex justify-between pl-4">
                        <input className="rounded flex-5 h-auto text-2xl font-bold py-2" value={titleText} onChange={(e)=>setTitleText(e.target.value)}></input>
                        <div className="flex flex-1 justify-around">
                            <input type="button" className="px-2 py-1 hover:cursor-pointer" onClick={()=>setModeIsImage(0)} value="Text"></input>
                            <input type="button" className="px-2 py-1 hover:cursor-pointer" onClick={()=>setModeIsImage(1)} value="Image"></input>
                        </div>
                    </div>
                    {modeIsImage
                    ?<div className="h-full w-full pt-10 pb-12 px-4">
                        {alertStatus?<AlertDialogue alertTitle="Invalid Image" AlertDialogue="Please Enter Valid Image" setAlertStatus={closeAlert}/>
                        :image
                        ?<div className="h-full w-full text-center">
                            <div className="h-3/4 w-auto flex justify-center align-middle"><img src={image}/></div>
                            <div className="flex justify-center py-8 font-semibold text-lg"><input className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-700 hover:cursor-pointer" type="button" value="Delete" onClick={()=>setImage(null)}/></div>
                        </div>
                        :<ImageUploader setImage={setImage} setAlertStatus={setAlertStatus} setErrorStatus={setErrorStatus}/>}
                    </div>
                    :<div className="h-full w-full pt-10 pb-12 px-4">
                        <textarea className="h-full w-full rounded-lg text-2xl font-semibold" value={descriptionText} onChange={(e)=>setDescriptionText(e.target.value)}></textarea>
                    </div>
                    }
                    <input className={titleText&&(image||descriptionText)?'px-5 py-3 font-bold text-2xl bg-red-500 rounded hover:cursor-pointer hover:bg-red-700':'px-5 py-3 font-bold text-2xl bg-gray-500 hover:cursor-not-allowed'} value='Submit' type='button' onClick={titleText&&(image||descriptionText)?handleSubmit:()=>{}}></input>
                </form>
            </div>
        </div>
)};