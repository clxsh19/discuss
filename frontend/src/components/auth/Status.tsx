'use client'
// not using this currently
const Status = () => {
  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const status = data.authenticated;
      console.log('user status client : ', status);
      return status;
    } catch (error) {
      console.error('Failed fetching status:', error);
      throw new Error('Failed to fetch status.');
    }
  }

  return (
    <button onClick={handleSubmit}>Status</button>
  )
}

// export default Status;
