import React from "react";
import { PostModel } from "./post-model";

export const Post= ({user})=>{
    return (
        <PostModel user={user}/>
    )
}