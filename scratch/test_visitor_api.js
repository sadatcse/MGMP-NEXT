async function runTest() {
  try {
    console.log('--- Testing Visitor Log POST (Direct) ---');
    const resDirect = await fetch('http://localhost:3000/api/visitor/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: '8.8.8.8',
        country: 'United States',
        referrer: '',
        path: '/aboutus',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      })
    });
    console.log('POST Direct status:', resDirect.status);
    console.log('POST Direct response:', await resDirect.json());

    console.log('--- Testing Visitor Log POST (Search Engine: Google) ---');
    const resGoogle = await fetch('http://localhost:3000/api/visitor/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: '1.1.1.1',
        country: 'Australia',
        referrer: 'https://www.google.com/search?q=gym+near+me',
        path: '/',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      })
    });
    console.log('POST Google status:', resGoogle.status);
    console.log('POST Google response:', await resGoogle.json());

    console.log('--- Testing Visitor Log POST (Referral: gym-reviews.com) ---');
    const resRef = await fetch('http://localhost:3000/api/visitor/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ip: '192.168.1.1',
        country: 'Local Network',
        referrer: 'https://gym-reviews.com/best-gyms',
        path: '/trainers',
        userAgent: 'Mozilla/5.0 (Test Browser)'
      })
    });
    console.log('POST Referral status:', resRef.status);
    console.log('POST Referral response:', await resRef.json());

    console.log('--- Testing Visitor Stats GET ---');
    const resStats = await fetch('http://localhost:3000/api/visitor/stats');
    console.log('GET Stats status:', resStats.status);
    const statsData = await resStats.json();
    console.log('GET Stats response:', JSON.stringify(statsData, null, 2));

  } catch (error) {
    console.error('Test error:', error);
  }
}

runTest();
