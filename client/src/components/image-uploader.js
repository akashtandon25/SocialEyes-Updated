import React from "react";
import { useDropzone } from "react-dropzone";

export const ImageUploader= ({setImage,setAlertStatus,setErrorStatus})=>{
    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
          'image/jpeg': [],
          'image/png': [],
          'image/jpg': [],
          'image/gif': [],
        },
        minSize: 50000,
        maxSize: 1024 * 1024 * 10,
        onDropAccepted: async (acceptedFiles) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result;
              setImage(base64);
            };
            reader.readAsDataURL(acceptedFiles[0]);
        },
        onDropRejected: (fileRejections) => {
          const errors = fileRejections[fileRejections.length - 1].errors;
          setAlertStatus(true);
          setErrorStatus(errors);
        }
      });
    return (
        <div {...getRootProps()} className="rounded bg-gray-100 m-10 p-5 hover:cursor-grab">
              <input {...getInputProps()} className={""} />
              <p className="font-semibold text-xl mb-2 underline">Upload</p>
              <p className="text-sm">File size must be greater than 50KB</p>
              <p className="text-sm">File size must be lesser than 10MB</p>
              <p className="text-sm">Accepted file types- .jpg, .jpeg, .png, .gif</p>
        </div>
    );
}