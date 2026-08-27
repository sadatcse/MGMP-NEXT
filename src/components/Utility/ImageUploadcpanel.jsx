import React, { useState } from 'react';
import Swal from 'sweetalert2';
import UseAxioSecure from '../../Hook/UseAxioSecure';

const ImageUpload = ({ setImageUrl, setPreviewImageUrl, folder = 'general' }) => {
    const axiosSecure = UseAxioSecure();
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        if (!imageFile) return;

        setUploading(true);

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('folder', folder);

        try {
            const response = await axiosSecure.post('/upload', formData);

            if (response.status === 200 && response.data?.success) {
                const uploadedUrl = response.data.data?.url || response.data.url;
                
                if (setImageUrl) {
                    setImageUrl(uploadedUrl);
                }
                if (setPreviewImageUrl) {
                    setPreviewImageUrl(uploadedUrl);
                }
                
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: `Image uploaded successfully to AWS S3 (${folder} folder)`,
                    background: '#1a1a1a',
                    color: '#fff',
                    confirmButtonColor: '#dc2626'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to upload image',
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
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="form-control border border-white/10 bg-black/40 rounded-2xl p-2 w-full my-2 relative">
            <input 
                onChange={handleImageUpload} 
                type="file" 
                disabled={uploading}
                accept="image/*"
                className="file-input file-input-bordered bg-transparent text-white w-full outline-none focus:outline-none cursor-pointer disabled:opacity-50" 
            />
            {uploading && (
                <div className="text-xs text-custom-yellow font-bold mt-1 px-2 animate-pulse">
                    Uploading image to AWS S3...
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
