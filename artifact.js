// Fonction pour convertir les données des personnages en PDF
function exportCharactersToPDF() {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    if (characters.length === 0) {
        alert('Aucun personnage à exporter.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const translateKey = (key) => {
        const translations = {
            name: "Nom du personnage",
            age: "Âge ou date de naissance",
            gender: "Sexe et orientation sexuelle",
            appearance: "Apparence physique",
            profession: "Profession ou rôle dans l'intrigue",
            nickname: "Citée ou surnom",
            traits: "Traits de caractère",
            strengths: "Forces et faiblesses",
            goals: "Objectifs et motivations",
            fears: "Peurs et faiblesses",
            values: "Valeurs et croyances",
            past: "Passé du personnage",
            "key-events": "Événements clés",
            conflicts: "Conflits",
            relations: "Amis, ennemis, et relations importantes",
            dynamics: "Dynamique entre le personnage et les autres",
            "love-relations": "Relations amoureuses ou familiales",
            evolution: "Évolution du personnage",
            "long-term-goals": "Objectifs à long terme",
            "changing-events": "Événements modifiant le personnage",
            quote: "Réplique importante",
            "distinctive-appearance": "Apparence ou comportement distinctif",
            hobbies: "Passions ou hobbies",
            memories: "Souvenirs ou objets significatifs",
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
