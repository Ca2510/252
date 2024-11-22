const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3'); // Alterando para melhor sqlite3
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Servir arquivos estáticos (HTML/CSS/JS)

// Banco de Dados SQLite usando better-sqlite3
const db = new Database('./gifts.db', { verbose: console.log }); // Utilizando o better-sqlite3

// Criação da tabela
db.exec(`
    CREATE TABLE IF NOT EXISTS gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status TEXT
    )
`);

// Rota para buscar todos os presentes
app.get('/api/gifts', (req, res) => {
    try {
        const rows = db.prepare('SELECT * FROM gifts').all(); // Usando o método síncrono .all()
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para atualizar o status de um presente
app.post('/api/update-status', (req, res) => {
    const { id, status } = req.body;

    try {
        const stmt = db.prepare('UPDATE gifts SET status = ? WHERE id = ?');
        stmt.run(status, id); // Usando o método síncrono .run()
        res.json({ message: 'Status atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});