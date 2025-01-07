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

window.onload = function() {
    loadCharacterList();
}
