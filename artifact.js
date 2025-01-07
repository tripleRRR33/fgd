function saveCharacterData() {
    const characterFields = ['name', 'age', 'gender', 'appearance', 'profession', 'nickname', 'traits', 'strengths', 'goals', 'fears', 'values', 'past', 'key-events', 'conflicts', 'relations', 'dynamics', 'love-relations', 'evolution', 'long-term-goals', 'changing-events', 'quote', 'distinctive-appearance', 'hobbies', 'memories'];
    const characterData = { id: Date.now() };

    characterFields.forEach(field => {
        characterData[field] = document.getElementById(field).value;
    });

    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    characters.push(characterData);
    localStorage.setItem('characters', JSON.stringify(characters));
    showToast('Données enregistrées!');
    loadCharacterList();
}

function loadCharacterList() {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';
    const characters = JSON.parse(localStorage.getItem('characters')) || [];

    characters.forEach(character => {
        const characterItem = document.createElement('div');
        characterItem.className = 'character-item';
        characterItem.innerHTML = `
            <p><strong>Nom:</strong> ${character.name}</p>
            <button onclick="editCharacter(${character.id})"><span class="icon">✏️</span> Éditer</button>
            <button onclick="confirmDeleteCharacter(${character.id})"><span class="icon">🗑️</span> Supprimer</button>
            <button onclick="downloadCharacterPDF(${character.id})"><span class="icon">📄</span> Télécharger en PDF</button>
        `;
        characterList.appendChild(characterItem);
    });
}

function confirmDeleteCharacter(id) {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cette fiche de personnage ?');
    if (confirmed) {
        deleteCharacter(id);
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

window.onload = function() {
    loadCharacterList();

    // Ajoutez un écouteur pour la barre de recherche
    document.getElementById('search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const characterItems = document.querySelectorAll('.character-item');
        characterItems.forEach(item => {
            const name = item.querySelector('p').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}
