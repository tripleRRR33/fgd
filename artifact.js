// Fonction pour convertir les données des personnages en CSV
function exportCharactersToCSV() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters.length === 0) {
        alert('Aucun personnage à exporter.');
        return;
    }

    const characterFields = ['name', 'age', 'gender', 'appearance', 'profession', 'nickname', 'traits', 'strengths', 'goals', 'fears', 'values', 'past', 'key-events', 'conflicts', 'relations', 'dynamics', 'love-relations', 'evolution', 'long-term-goals', 'changing-events', 'quote', 'distinctive-appearance', 'hobbies', 'memories'];
    const csvRows = [];

    // Ajouter les en-têtes
    csvRows.push(characterFields.join(','));

    // Ajouter les données des personnages
    characters.forEach(character => {
        const values = characterFields.map(field => `"${character[field] || ''}"`);
        csvRows.push(values.join(','));
    });

    // Créer un blob et le télécharger
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'characters.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Ajouter un bouton pour l'exportation dans la liste des personnages
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

    // Ajouter le bouton d'exportation
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exporter en CSV';
    exportButton.onclick = exportCharactersToCSV;
    characterList.appendChild(exportButton);
}

// Fonctionnalités existantes
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

// Autres fonctions existantes (editCharacter, confirmDeleteCharacter, showToast, etc.)

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
