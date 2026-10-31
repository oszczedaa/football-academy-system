import { useState, useEffect } from 'react';

export default function App() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/players');
      if (!res.ok) throw new Error('Błąd pobierania');
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setMessage('Wystąpił błąd serwera. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || name.length < 3) {
      setMessage('Imię musi zawierać co najmniej 3 znaki!');
      return;
    }

    setIsLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position: 'Napastnik' })
      });
      if (!res.ok) throw new Error('Błąd zapisu');
      
      setMessage('Sukces: Dodano zawodnika!');
      setName('');
      fetchPlayers();
    } catch (err) {
      setMessage('Błąd zapisu do bazy danych.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Szkółka Piłkarska - Kadra</h1>
      
      {isLoading && <p>Ładowanie danych...</p>}
      {message && <p style={{ fontWeight: 'bold' }}>{message}</p>}

      <form onSubmit={handleAdd} style={{ marginBottom: '20px' }}>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Imię i nazwisko" 
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }}
        >
          Dodaj Zawodnika
        </button>
      </form>

      <table border="1" cellPadding="10">
        <tbody>
          {players.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}