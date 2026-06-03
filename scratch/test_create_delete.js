async function runTest() {
  try {
    // 1. Create a notice
    console.log('Creating a test notice...');
    const postRes = await fetch('http://localhost:3000/api/notice/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Test Title ' + Date.now(),
        description: '<p>Test Description</p>',
        date: new Date(),
        author: 'Admin Test',
        category: 'Announcement',
        image: 'https://i.ibb.co/V9y3dZ8/image.png'
      })
    });
    console.log('Create notice status:', postRes.status);
    const newNotice = await postRes.json();
    console.log('Created notice details:', newNotice);
    
    if (!newNotice._id) {
      throw new Error('Failed to create notice');
    }
    
    // 2. Fetch all notices
    console.log('Fetching all notices...');
    const listRes = await fetch('http://localhost:3000/api/notice/get-all');
    const notices = await listRes.json();
    console.log('Notices count after creation:', notices.length);
    
    // 3. Delete the newly created notice
    console.log(`Deleting notice ${newNotice._id}...`);
    const delRes = await fetch(`http://localhost:3000/api/notice/delete/${newNotice._id}`, {
      method: 'DELETE'
    });
    console.log('Delete status:', delRes.status);
    const delResult = await delRes.json();
    console.log('Delete result:', delResult);

  } catch (error) {
    console.error('Test error:', error);
  }
}

runTest();
