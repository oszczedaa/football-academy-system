const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let players = [
    { id: 1, name: 'Jan Kowalski', position: 'Napastnik' },
    { id: 2, name: 'Adam Nowak', position: 'Pomocnik' }
];

app.get('/api/players', (req, res) => {
    res.status(200).json(players);
});

app.get('/api/players/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    if (!player) {
        return res.status(404).json({ error: 'Nie znaleziono zawodnika o podanym ID' });
    }
    res.status(200).json(player);
});

app.post('/api/players', (req, res) => {
    const { name, position } = req.body;
    
    if (!name || !position) {
        return res.status(400).json({ error: 'Pola "name" oraz "position" są wymagane!' });
    }

    const newPlayer = {
        id: players.length > 0 ? players[players.length - 1].id + 1 : 1,
        name,
        position
    };

    players.push(newPlayer);
    res.status(201).json(newPlayer);
});

app.put('/api/players/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    if (!player) {
        return res.status(404).json({ error: 'Nie znaleziono zawodnika do aktualizacji' });
    }

    const { name, position } = req.body;
    if (!name || !position) {
        return res.status(400).json({ error: 'Pola "name" oraz "position" są wymagane!' });
    }

    player.name = name;
    player.position = position;
    res.status(200).json(player);
});

app.delete('/api/players/:id', (req, res) => {
    const index = players.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: 'Nie znaleziono zawodnika do usunięcia' });
    }

    const deletedPlayer = players.splice(index, 1);
    res.status(200).json({ message: 'Usunięto pomyślnie', player: deletedPlayer[0] });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
