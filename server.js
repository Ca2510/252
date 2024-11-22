const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Servir arquivos estáticos (HTML/CSS/JS)

// Banco de Dados SQLite
const db = new sqlite3.Database('./gifts.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }
});

// Criação da tabela
db.run(`
    CREATE TABLE IF NOT EXISTS gifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        status TEXT
    )
`);

// Rota para buscar todos os presentes
app.get('/api/gifts', (req, res) => {
    db.all('SELECT * FROM gifts', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Rota para atualizar o status de um presente
app.post('/api/update-status', (req, res) => {
    const { id, status } = req.body;

    db.run(
        'UPDATE gifts SET status = ? WHERE id = ?',
        [status, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'Status atualizado com sucesso!' });
            }
        }
    );
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
