document.addEventListener('DOMContentLoaded', () => {
    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch('/api/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, status: newStatus }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Obrigado pelo presente. Estamos muito felizes!');
                fetchGifts(); // Atualiza a lista
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        }
    };

    const fetchGifts = async () => {
        try {
            const response = await fetch('/api/gifts');
            const gifts = await response.json();
            const giftList = document.querySelector('.lista ul');
            giftList.innerHTML = '';

            gifts.forEach((gift) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <h3>${gift.name}</h3>
                    <select class="status" data-id="${gift.id}">
                        <option value="disponivel" ${gift.status === 'Disponível' ? 'selected' : ''}>Disponível</option>
                        <option value="comprado" ${gift.status === 'Presente Comprado' ? 'selected' : ''}>Presente Comprado</option>
                    </select>
                `;
                giftList.appendChild(listItem);
            });

            // Adiciona eventos aos selects
            document.querySelectorAll('.status').forEach((select) => {
                select.addEventListener('change', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const newStatus = e.target.value;
                    updateStatus(id, newStatus);
                });
            });
        } catch (error) {
            console.error('Erro ao buscar presentes:', error);
        }
    };

    // Carrega os presentes ao inicializar
    fetchGifts();
});
