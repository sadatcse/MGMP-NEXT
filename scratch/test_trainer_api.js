async function runTrainerTest() {
  try {
    // 1. Create a Trainer (POST)
    console.log('1. Creating a trainer...');
    const postRes = await fetch('http://localhost:3000/api/trainer/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: 'Trainer John Doe',
        short_name: 'John',
        image_url: 'https://i.ibb.co/V9y3dZ8/john.png',
        bio: 'Certified gym trainer with 10 years experience.',
        certification: 'ACE Certified Personal Trainer',
        email: 'john.doe@example.com',
        Instagram: 'john_doe_fit',
        facebook: 'johndoefit',
        mobile: '1234567890',
        role: 'Personal Trainer',
        position_title: 'Head Trainer'
      })
    });
    console.log('Create status:', postRes.status);
    const trainer = await postRes.json();
    console.log('Created trainer:', trainer);
    
    if (!trainer._id) {
      throw new Error('Failed to create trainer - no _id returned');
    }
    const trainerId = trainer._id;

    // 2. Get All Trainers (GET)
    console.log('\n2. Fetching all trainers...');
    const getAllRes = await fetch('http://localhost:3000/api/trainer/get-all');
    console.log('Get all status:', getAllRes.status);
    const trainersList = await getAllRes.json();
    console.log('Trainers count:', trainersList.length);
    const found = trainersList.find(t => t._id === trainerId);
    console.log('Trainer found in list:', found ? 'Yes' : 'No');

    // 3. Get Trainer by ID (GET)
    console.log(`\n3. Fetching trainer by ID: ${trainerId}...`);
    const getByIdRes = await fetch(`http://localhost:3000/api/trainer/get-id/${trainerId}`);
    console.log('Get by ID status:', getByIdRes.status);
    const fetchedTrainer = await getByIdRes.json();
    console.log('Fetched trainer name:', fetchedTrainer.full_name);

    // 4. Update Trainer (PUT)
    console.log(`\n4. Updating trainer: ${trainerId}...`);
    const putRes = await fetch(`http://localhost:3000/api/trainer/put/${trainerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: 'Trainer John Doe Updated',
        short_name: 'John Updated',
        image_url: 'https://i.ibb.co/V9y3dZ8/john_updated.png',
        bio: 'Updated bio here.',
        certification: 'ACE & NASM Certified',
        email: 'john.updated@example.com',
        Instagram: 'john_doe_updated',
        facebook: 'johndoeupdated',
        mobile: '0987654321',
        role: 'Group Fitness Instructor',
        position_title: 'Senior Instructor'
      })
    });
    console.log('Update status:', putRes.status);
    const updateResult = await putRes.json();
    console.log('Update result:', updateResult);

    // Verify change
    const getUpdatedRes = await fetch(`http://localhost:3000/api/trainer/get-id/${trainerId}`);
    const updatedTrainer = await getUpdatedRes.json();
    console.log('Verified updated name:', updatedTrainer.full_name);

    // 5. Delete Trainer (DELETE)
    console.log(`\n5. Deleting trainer: ${trainerId}...`);
    const delRes = await fetch(`http://localhost:3000/api/trainer/delete/${trainerId}`, {
      method: 'DELETE'
    });
    console.log('Delete status:', delRes.status);
    const delResult = await delRes.json();
    console.log('Delete result:', delResult);

    // Verify deletion
    const getDeletedRes = await fetch(`http://localhost:3000/api/trainer/get-id/${trainerId}`);
    console.log('Get deleted trainer status (should be 404):', getDeletedRes.status);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTrainerTest();
