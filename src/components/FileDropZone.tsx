
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";


interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
    
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <p>Drag and drop some files here, or click to select files</p>
          {/* <ExploreIcon sx={{ width: 80, height: 80, color: "white" }} /> */}
        </div>
      )}
    </div>
  );
};

export default FileDropZone;