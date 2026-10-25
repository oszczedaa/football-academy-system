import { useState, useEffect } from 'react';

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Jan Kowalski', position: 'Napastnik' },
    { id: 2, name: 'Adam Nowak', position: 'Pomocnik' }
  ]);
  
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiUrl}/players`)
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error('Błąd połączenia z API, używam danych makietowych:', err));
  }, [apiUrl]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Szkółka Piłkarska - Kadra</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Imię i Nazwisko</th>
            <th>Pozycja</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} style={{ textAlign: 'center' }}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;