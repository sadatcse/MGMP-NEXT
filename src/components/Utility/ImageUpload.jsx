import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = () => {
    const onDrop = useCallback(acceptedFiles => {
        // Handle the files
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} style={{ border: '2px dashed #cccccc', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    );
};

export default ImageUpload;
