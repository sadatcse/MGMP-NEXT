async function runNewsTest() {
  try {
    console.log('--- STARTING NEWS API TESTS ---');
    // 1. Create a Blog Post (POST)
    console.log('1. Creating a blog post...');
    const postRes = await fetch('http://localhost:3000/api/news/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'New Fitness Blog Post ' + Date.now(),
        description: '<p>Learn about modern fitness coaching.</p>',
        date: new Date(),
        category: 'fitness',
        tags: ['fitness', 'workout'],
        image: 'https://i.ibb.co/V9y3dZ8/fitness.png'
      })
    });
    console.log('Create News status:', postRes.status);
    const blog = await postRes.json();
    console.log('Created blog:', blog);
    
    if (!blog._id) throw new Error('Failed to create blog post');
    const blogId = blog._id;

    // 2. Fetch all blogs (GET)
    console.log('\n2. Fetching all blogs...');
    const getAllRes = await fetch('http://localhost:3000/api/news/get-all');
    console.log('Get all news status:', getAllRes.status);
    const blogs = await getAllRes.json();
    console.log('Blogs count:', blogs.length);

    // 3. Fetch blog by ID (GET)
    console.log(`\n3. Fetching blog by ID: ${blogId}...`);
    const getByIdRes = await fetch(`http://localhost:3000/api/news/get-id/${blogId}`);
    console.log('Get by ID status:', getByIdRes.status);
    const fetchedBlog = await getByIdRes.json();
    console.log('Fetched blog title:', fetchedBlog.title);

    // 4. Update blog (PUT)
    console.log(`\n4. Updating blog: ${blogId}...`);
    const putRes = await fetch(`http://localhost:3000/api/news/put/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Updated Fitness Blog Title',
        description: '<p>Updated description here.</p>',
        date: new Date(),
        category: 'fitness',
        tags: ['fitness', 'updated'],
        image: 'https://i.ibb.co/V9y3dZ8/fitness_updated.png'
      })
    });
    console.log('Update news status:', putRes.status);
    const updateResult = await putRes.json();
    console.log('Update result:', updateResult);

    // 5. Delete blog (DELETE)
    console.log(`\n5. Deleting blog: ${blogId}...`);
    const delRes = await fetch(`http://localhost:3000/api/news/delete/${blogId}`, {
      method: 'DELETE'
    });
    console.log('Delete news status:', delRes.status);
    const delResult = await delRes.json();
    console.log('Delete result:', delResult);

    // Verify deleted
    const getDeletedRes = await fetch(`http://localhost:3000/api/news/get-id/${blogId}`);
    console.log('Get deleted news status (should be 404):', getDeletedRes.status);

  } catch (error) {
    console.error('News tests failed:', error);
  }
}

async function runTestimonialTest() {
  try {
    console.log('\n--- STARTING TESTIMONIAL API TESTS ---');
    // 1. Create a Testimonial (POST)
    console.log('1. Creating a testimonial...');
    const postRes = await fetch('http://localhost:3000/api/testimonial/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Gym transformed my life',
        name: 'Jane Doe',
        comment: 'I lost 15kg in 3 months. Highly recommended!',
        image: 'https://i.ibb.co/V9y3dZ8/jane.png'
      })
    });
    console.log('Create Testimonial status:', postRes.status);
    const testimonial = await postRes.json();
    console.log('Created testimonial:', testimonial);

    if (!testimonial._id) throw new Error('Failed to create testimonial');
    const testimonialId = testimonial._id;

    // 2. Fetch all testimonials (GET)
    console.log('\n2. Fetching all testimonials...');
    const getAllRes = await fetch('http://localhost:3000/api/testimonial/get-all');
    console.log('Get all testimonials status:', getAllRes.status);
    const testimonials = await getAllRes.json();
    console.log('Testimonials count:', testimonials.length);

    // 3. Fetch testimonial by ID (GET)
    console.log(`\n3. Fetching testimonial by ID: ${testimonialId}...`);
    const getByIdRes = await fetch(`http://localhost:3000/api/testimonial/get-id/${testimonialId}`);
    console.log('Get by ID status:', getByIdRes.status);
    const fetchedTestimonial = await getByIdRes.json();
    console.log('Fetched testimonial name:', fetchedTestimonial.name);

    // 4. Update testimonial (PUT)
    console.log(`\n4. Updating testimonial: ${testimonialId}...`);
    const putRes = await fetch(`http://localhost:3000/api/testimonial/put/${testimonialId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'Gym transformed my life (Updated)',
        name: 'Jane Doe Updated',
        comment: 'Updated testimonial comment here.',
        image: 'https://i.ibb.co/V9y3dZ8/jane_updated.png'
      })
    });
    console.log('Update testimonial status:', putRes.status);
    const updateResult = await putRes.json();
    console.log('Update result:', updateResult);

    // 5. Delete testimonial (DELETE)
    console.log(`\n5. Deleting testimonial: ${testimonialId}...`);
    const delRes = await fetch(`http://localhost:3000/api/testimonial/delete/${testimonialId}`, {
      method: 'DELETE'
    });
    console.log('Delete testimonial status:', delRes.status);
    const delResult = await delRes.json();
    console.log('Delete result:', delResult);

    // Verify deleted
    const getDeletedRes = await fetch(`http://localhost:3000/api/testimonial/get-id/${testimonialId}`);
    console.log('Get deleted testimonial status (should be 404):', getDeletedRes.status);

  } catch (error) {
    console.error('Testimonial tests failed:', error);
  }
}

async function runAll() {
  await runNewsTest();
  await runTestimonialTest();
}

runAll();
