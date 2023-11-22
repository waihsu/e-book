
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa6";
import { Card } from "./ui/card";


interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const [image, setImage] = useState("");
  const onDrop = (files: File[]) => {
    onFileSelected(files);
    const file = files[0];
    const reader = new FileReader();
    (reader.onload = (evt) => {
      setImage(evt.target?.result as string);
    }),
      reader.readAsDataURL(file),
      [onFileSelected];
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div>
      {image ? <div className=" relative w-96 h-36">
        <Image src={image} alt="pageimage" fill sizes="100vw" style={{objectFit: "contain"}} />
      </div> : <span></span>}
      <Card
      {...getRootProps()}
     className=" w-full h-40 dark:bg-[#36363F]"
    >
      
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div className=" w-full h-full flex justify-center items-center" >
          <p className=" text-6xl">
          <FaImage  />
          </p>
          {/* <ExploreIcon sx={{ width: 80, height: 80, color: "white" }} /> */}
        </div>
      )}
      
    </Card>
    </div>
  );
};

export default FileDropZone;