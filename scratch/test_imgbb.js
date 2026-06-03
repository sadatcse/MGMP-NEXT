import axios from 'axios';

async function testImgbb() {
  const apiKey = 'bf7d52fc3431a0a728b5cd4630ed74a0';
  const uploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;
  
  // A 1x1 transparent PNG in base64
  const dummyBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  
  const formData = new FormData();
  formData.append('image', dummyBase64);
  
  try {
    console.log('Uploading dummy image to ImgBB...');
    const response = await axios.post(uploadUrl, formData);
    console.log('Response status:', response.status);
    console.log('Uploaded image URL:', response.data?.data?.url);
  } catch (error) {
    console.error('ImgBB Upload Error:', error.response?.data || error.message);
  }
}

testImgbb();
