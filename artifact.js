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

// Fonction pour convertir les données des personnages en JSON
function exportCharactersToJSON() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters.length === 0) {
        alert('Aucun personnage à exporter.');
        return;
    }

    const jsonString = JSON.stringify(characters, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'characters.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Fonction pour convertir les données des personnages en PDF
function exportCharactersToPDF() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters.length === 0) {
        alert('Aucun personnage à exporter.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    characters.forEach((character, index) => {
        doc.text(`Personnage ${index + 1}`, 10, 10 + index * 10);
        for (const [key, value] of Object.entries(character)) {
            doc.text(`${key}: ${value}`, 10, 20 + index * 10);
        }
        if (index !== characters.length - 1) {
            doc.addPage();
        }
    });

    doc.save('characters.pdf');
}

// Ajouter les boutons pour l'exportation dans la liste des personnages
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

    // Ajouter les boutons d'exportation
    const exportCSVButton = document.createElement('button');
    exportCSVButton.textContent = 'Exporter en CSV';
    exportCSVButton.onclick = exportCharactersToCSV;
    characterList.appendChild(exportCSVButton);

    const exportJSONButton = document.createElement('button');
    exportJSONButton.textContent = 'Exporter en JSON';
    exportJSONButton.onclick = exportCharactersToJSON;
    characterList.appendChild(exportJSONButton);

    const exportPDFButton = document.createElement('button');
    exportPDFButton.textContent = 'Exporter en PDF';
    exportPDFButton.onclick = exportCharactersToPDF;
    characterList.appendChild(exportPDFButton);
}

// Fonctionnalités existantes (saveCharacterData, editCharacter, confirmDeleteCharacter, showToast, etc.)

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
