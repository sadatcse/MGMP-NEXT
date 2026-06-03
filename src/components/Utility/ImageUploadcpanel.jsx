import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ImageUpload = ({ setImageUrl, setPreviewImageUrl }) => {
    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        const formData = new FormData();
        formData.append('image', imageFile);

        const uploadUrl = `/api/upload`;

        try {
            const response = await axios.post(uploadUrl, formData);

            if (response.status === 200 && response.data?.success) {
                const uploadedUrl = response.data.data.url;
                
                if (setImageUrl) {
                    setImageUrl(uploadedUrl);
                }
                if (setPreviewImageUrl) {
                    setPreviewImageUrl(uploadedUrl);
                }
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Image uploaded successfully to server uploads folder',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to upload image to host',
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                });
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.response?.data?.message || error.response?.data?.error?.message || error.message || 'Failed to upload image',
                background: '#1a1a1a',
                color: '#fff',
                confirmButtonColor: '#dc2626'
            });
        }
    };

    return (
        <div className="form-control border border-white/10 bg-black/40 rounded-2xl p-2 w-full my-2">
            <input 
                onChange={handleImageUpload} 
                type="file" 
                className="file-input file-input-bordered bg-transparent text-white w-full outline-none focus:outline-none cursor-pointer" 
            />
        </div>
    );
};

export default ImageUpload;
