// client/src/App.js
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(res => res.json())
      .then(data => setData(data.message));
  }, []);

  return <div>{data}</div>;
}

export default App;
