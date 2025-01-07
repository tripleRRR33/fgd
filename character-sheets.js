// Fonction pour enregistrer un personnage dans le localStorage
function saveCharacterData() {
    const character = {
        id: Date.now(),
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        appearance: document.getElementById('appearance').value,
        profession: document.getElementById('profession').value,
        nickname: document.getElementById('nickname').value,
        traits: document.getElementById('traits').value,
        strengths: document.getElementById('strengths').value,
        goals: document.getElementById('goals').value,
        fears: document.getElementById('fears').value,
        values: document.getElementById('values').value,
        past: document.getElementById('past').value,
        keyEvents: document.getElementById('keyEvents').value,
        conflicts: document.getElementById('conflicts').value,
        relations: document.getElementById('relations').value,
        dynamics: document.getElementById('dynamics').value,
        loveRelations: document.getElementById('loveRelations').value,
        evolution: document.getElementById('evolution').value,
        longTermGoals: document.getElementById('longTermGoals').value,
        changingEvents: document.getElementById('changingEvents').value,
        quote: document.getElementById('quote').value,
        distinctiveAppearance: document.getElementById('distinctiveAppearance').value,
        hobbies: document.getElementById('hobbies').value,
        memories: document.getElementById('memories').value
    };

    let characters = JSON.parse(localStorage.getItem('characters')) || [];
    characters.push(character);
    localStorage.setItem('characters', JSON.stringify(characters));
    alert('Personnage enregistré avec succès!');
    loadCharacterList();
}

// Fonction de vérification si des personnages existent avant l'exportation
function checkCharactersExist() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters.length === 0) {
        alert('Aucun personnage à exporter.');
        return false;
    }
    return true;
}

// Modifier les fonctions d'exportation pour vérifier si des personnages existent avant de procéder
function exportCharactersToCSV() {
    if (!checkCharactersExist()) return;

    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const characterFields = ['name', 'age', 'gender', 'appearance', 'profession', 'nickname', 'traits', 'strengths', 'goals', 'fears', 'values', 'past', 'keyEvents', 'conflicts', 'relations', 'dynamics', 'loveRelations', 'evolution', 'longTermGoals', 'changingEvents', 'quote', 'distinctiveAppearance', 'hobbies', 'memories'];
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

function exportCharactersToJSON() {
    if (!checkCharactersExist()) return;

    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const jsonString = JSON.stringify(characters, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'characters.json';
    a.click();
    URL.revokeObjectURL(url);
}

function exportCharactersToPDF() {
    if (!checkCharactersExist()) return;

    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const translateKey = (key) => {
        const translations = {
            name: "Nom du personnage",
            age: "Âge ou date de naissance",
            gender: "Sexe et orientation",
            appearance: "Apparence physique",
            profession: "Profession ou rôle",
            nickname: "Citée ou surnom",
            traits: "Traits de caractère",
            strengths: "Forces et faiblesses",
            goals: "Objectifs et motivations",
            fears: "Peurs et faiblesses",
            values: "Valeurs et croyances",
            past: "Passé du personnage",
            keyEvents: "Événements clés",
            conflicts: "Conflits",
            relations: "Amis, ennemis, et relations importantes",
            dynamics: "Dynamique entre le personnage et les autres",
            loveRelations: "Relations amoureuses ou familiales",
            evolution: "Évolution du personnage",
            longTermGoals: "Objectifs à long terme",
            changingEvents: "Événements modifiant le personnage",
            quote: "Réplique importante",
            distinctiveAppearance: "Apparence ou comportement distinctif",
            hobbies: "Passions ou hobbies",
            memories: "Souvenirs ou objets significatifs"
        };
        return translations[key] || key;
    };

    characters.forEach((character, index) => {
        doc.setFontSize(16);
        doc.text(`Personnage ${index + 1}`, 10, 10);
        doc.setFontSize(12);
        let yPosition = 20;
        for (const [key, value] of Object.entries(character)) {
            doc.text(`${translateKey(key)}: ${value}`, 10, yPosition);
            yPosition += 10;
            if (yPosition > 270) { // Pour éviter que le texte dépasse la page
                doc.addPage();
                yPosition = 20;
            }
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

// Fonctionnalités existantes (editCharacter, confirmDeleteCharacter, etc.)

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
