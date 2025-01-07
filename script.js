function saveCharacterData() {
    const characterFields = ['name', 'age', 'gender', 'appearance', 'profession', 'nickname', 'traits', 'strengths', 'goals', 'fears', 'values', 'past', 'key-events', 'conflicts', 'relations', 'dynamics', 'love-relations', 'evolution', 'long-term-goals', 'changing-events', 'quote', 'distinctive-appearance', 'hobbies', 'memories'];
    const characterData = { id: Date.now() };

    characterFields.forEach(field => {
        characterData[field] = document.getElementById(field).value;
    });

    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    characters.push(characterData);
    localStorage.setItem('characters', JSON.stringify(characters));
    alert('Données enregistrées!');
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
            <button onclick="editCharacter(${character.id})">Éditer</button>
            <button onclick="deleteCharacter(${character.id})">Supprimer</button>
            <button onclick="downloadCharacterPDF(${character.id})">Télécharger en PDF</button>
        `;
        characterList.appendChild(characterItem);
    });
}

function editCharacter(id) {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const character = characters.find(c => c.id === id);
    if (character) {
        Object.entries(character).forEach(([key, value]) => {
            if (document.getElementById(key)) {
                document.getElementById(key).value = value;
            }
        });
    }
}

function deleteCharacter(id) {
    let characters = JSON.parse(localStorage.getItem('characters')) || [];
    characters = characters.filter(c => c.id !== id);
    localStorage.setItem('characters', JSON.stringify(characters));
    loadCharacterList();
}

function downloadCharacterPDF(id) {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const character = characters.find(c => c.id === id);
    if (character) {
        const characterSheet = document.createElement('div');
        characterSheet.className = 'character-sheet';
        Object.entries(character).forEach(([key, value]) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            characterSheet.appendChild(p);
        });

        html2canvas(characterSheet).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`fiche_personnage_${id}.pdf`);
        }).catch(error => {
            console.error('Erreur lors de la génération du PDF:', error);
            alert('Échec du téléchargement de la fiche. Veuillez réessayer.');
        });
    } else {
        alert('Personnage non trouvé. Veuillez réessayer.');
    }
}

window.onload = function() {
    loadCharacterList();
}
