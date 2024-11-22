import sqlite3

# Criação do banco de dados
conn = sqlite3.connect('gifts.db')
c = conn.cursor()

# Criando a tabela de presentes
c.execute('''
    CREATE TABLE IF NOT EXISTS presents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        image TEXT,
        status TEXT
    )
''')

# Inserindo os dados dos presentes (nome, descrição, imagem e status)
gifts = [
    ('Jogo de Cama 1', 'Jogo para cama de casal convencional contendo 4 peças (lençol, 2 fronhas e cobre leito)', './imgs/Cama.svg', 'disponivel'),
    ('Jogo de Cama 2', 'Jogo para cama de casal convencional contendo 4 peças (lençol, 2 fronhas e cobre leito)', './imgs/Cama.svg', 'disponivel'),
    ('Jogo de Cama 3', 'Jogo para cama de casal convencional contendo 4 peças (lençol, 2 fronhas e cobre leito)', './imgs/Cama.svg', 'disponivel'),
    ('Jogo de Toalhas 1', 'Jogo de toalhas de banho e rosto', './imgs/Toalha 1.svg', 'disponivel'),
    ('Jogo de Toalhas 2', 'Jogo de toalhas de banho e rosto', './imgs/Toalha 1.svg', 'disponivel'),
    ('Mesinha Bar/Café', 'Mesinha para bar ou café', './imgs/Bar.svg', 'disponivel'),
    ('Jogo de Copos', 'Jogo de copos', './imgs/Copos.svg', 'disponivel'),
    ('Aparelho de Jantar', 'Aparelho completo para jantar', './imgs/Aparelho de Jantar.svg', 'disponivel'),
    ('Jogo de Bowl para Sopa/Sobremesa', 'Jogo de bowls', './imgs/Bowl.svg', 'disponivel'),
    ('Fechadura Eletrônica', 'Fechadura eletrônica para portas', './imgs/Fechadura.svg', 'disponivel'),
    ('Kit Lavabo', 'Kit para lavabo', './imgs/Social.svg', 'disponivel'),
    ('Kit Banheiro Casal', 'Kit de banheiro para casal', './imgs/Banheiro Casal.svg', 'disponivel'),
    ('Fruteira de Mesa', 'Fruteira para mesa', './imgs/FRUTEIRA (2).svg', 'disponivel'),
    ('Kit Organizadores Para Ele', 'Kit de organizadores para o homem', './imgs/Pra Ele.svg', 'disponivel'),
    ('Kit Organizadores Para Ela', 'Kit de organizadores para a mulher', './imgs/Pra Ela.svg', 'disponivel'),
    ('Aspirador de Pó', 'Aspirador de pó', './imgs/Aspirador.svg', 'disponivel'),
    ('Capacho', 'Capacho divertido', './imgs/capachoo.svg', 'disponivel'),
    ('2 Tapetes para Banheiro Antiderrapante', 'Tapetes para banheiro', './imgs/Tapete.svg', 'disponivel'),
    ('Frigideira com Alça Removível', 'Frigideira com alça removível', './imgs/Frigideira.svg', 'disponivel'),
    ('Forma de Pão', 'Forma de pão', './imgs/Forma.svg', 'disponivel'),
    ('Coberdrom Dupla Face', 'Coberdrom de dupla face', './imgs/fofinho.svg', 'disponivel'),
    ('Escultura de Parede - Tam G', 'Escultura de parede', './imgs/escultura.svg', 'disponivel'),
    ('Capas para Almofadas', 'Capas para almofadas', './imgs/ALMOFADA.svg', 'disponivel'),
    ('Lixeira + Limpador Lavabo', 'Lixeira e limpador de lavabo', './imgs/Lixeira Lavabo.svg', 'disponivel'),
    ('Cadeira de Escritório', 'Cadeira de escritório', './imgs/cadeira.svg', 'disponivel')
]

# Inserindo os dados na tabela
c.executemany('''
    INSERT INTO presents (name, description, image, status) 
    VALUES (?, ?, ?, ?)
''', gifts)

# Salvando as mudanças e fechando a conexão
conn.commit()
conn.close()

print("Banco de dados gifts.db criado com sucesso!")