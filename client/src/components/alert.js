import React from "react";
import { Alert,AlertTitle,AlertDescription,AlertIcon } from "@chakra-ui/alert";
import {CloseButton} from "@chakra-ui/react"

export const AlertDialogue= (props)=>{
    const title=props.alertTitle;
    const description=props.AlertDialogue;
    const closeBox=props.setAlertStatus;
    return (
        <Alert status='error' className="rounded-2xl bg-gray-300 py-5 px-2 z-20">
            <div className="w-20 h-20 mr-3">
                <AlertIcon />
            </div>
            <div className="text-left">
                <div className="font-semibold">
                    <AlertTitle mr={2}>{title}</AlertTitle>
                </div>
                
                <div>
                    <AlertDescription>{description}</AlertDescription>
                </div>
            </div>
            <CloseButton onClick={()=>{
                closeBox(false);
            }} position='absolute' right='8px' top='8px' />
        </Alert>
    );
}