function saveCharacterData() {
    const characterData = {
        id: Date.now(), // Unique ID for each character
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
        keyEvents: document.getElementById('key-events').value,
        conflicts: document.getElementById('conflicts').value,
        relations: document.getElementById('relations').value,
        dynamics: document.getElementById('dynamics').value,
        loveRelations: document.getElementById('love-relations').value,
        evolution: document.getElementById('evolution').value,
        longTermGoals: document.getElementById('long-term-goals').value,
        changingEvents: document.getElementById('changing-events').value,
        quote: document.getElementById('quote').value,
        distinctiveAppearance: document.getElementById('distinctive-appearance').value,
        hobbies: document.getElementById('hobbies').value,
        memories: document.getElementById('memories').value
    };

    let characters = JSON.parse(localStorage.getItem('characters')) || [];
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
        for (const key in character) {
            if (character.hasOwnProperty(key) && document.getElementById(key)) {
                document.getElementById(key).value = character[key];
            }
        }
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
        for (const key in character) {
            if (character.hasOwnProperty(key)) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${character[key]}`;
                characterSheet.appendChild(p);
            }
        }

        html2canvas(characterSheet).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`fiche_personnage_${id}.pdf`);
        });
    }
}

window.onload = function() {
    loadCharacterList();
}
