// Fonction pour convertir les données des artéfacts en CSV
function exportArtifactsToCSV() {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    if (artifacts.length === 0) {
        alert('Aucun artéfact à exporter.');
        return;
    }

    const artifactFields = ['name', 'category', 'origin', 'appearance', 'size', 'materials', 'visual-features', 'main-power', 'side-effects', 'limits', 'activation-conditions', 'character-usefulness', 'story-importance', 'associated-conflicts', 'creator', 'key-events', 'evolution', 'benefits', 'negative-effects', 'compatibility', 'story-links', 'mythology', 'character-reactions', 'associated-quote', 'symbolism', 'visual-effects', 'associated-objects', 'contextual-description', 'alterations', 'new-secrets', 'hero-evolution-link'];
    const csvRows = [];

    // Ajouter les en-têtes
    csvRows.push(artifactFields.join(','));

    // Ajouter les données des artéfacts
    artifacts.forEach(artifact => {
        const values = artifactFields.map(field => `"${artifact[field] || ''}"`);
        csvRows.push(values.join(','));
    });

    // Créer un blob et le télécharger
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artifacts.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Fonction pour convertir les données des artéfacts en JSON
function exportArtifactsToJSON() {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    if (artifacts.length === 0) {
        alert('Aucun artéfact à exporter.');
        return;
    }

    const jsonString = JSON.stringify(artifacts, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artifacts.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Fonction pour convertir les données des artéfacts en PDF
function exportArtifactsToPDF() {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    if (artifacts.length === 0) {
        alert('Aucun artéfact à exporter.');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const translateKey = (key) => {
        const translations = {
            name: "Nom de l'artéfact",
            category: "Catégorie",
            origin: "Origine",
            appearance: "Apparence physique",
            size: "Taille",
            materials: "Matériaux",
            "visual-features": "Particularités visuelles",
            "main-power": "Pouvoir principal",
            "side-effects": "Effets secondaires",
            limits: "Limites",
            "activation-conditions": "Conditions d’activation",
            "character-usefulness": "Utilité pour les personnages",
            "story-importance": "Importance pour l’intrigue",
            "associated-conflicts": "Conflits associés",
            creator: "Créateur ou origine légendaire",
            "key-events": "Événements marquants",
            evolution: "Évolution au fil du temps",
            benefits: "Bénéfices",
            "negative-effects": "Effets négatifs",
            compatibility: "Compatibilité",
            "story-links": "Liens avec d’autres éléments de l’histoire",
            mythology: "Réputation ou mythologie",
            "character-reactions": "Réactions des personnages",
            "associated-quote": "Phrase ou légende associée",
            symbolism: "Symbole ou métaphore",
            "visual-effects": "Sons ou effets visuels",
            "associated-objects": "Objets ou lieux associés",
            "contextual-description": "Description contextuelle",
            alterations: "Altérations",
            "new-secrets": "Révélation de nouveaux secrets",
            "hero-evolution-link": "Lien avec l’évolution du héros",
        };
        return translations[key] || key;
    };

    artifacts.forEach((artifact, index) => {
        doc.setFontSize(16);
        doc.text(`Artéfact ${index + 1}`, 10, 10);
        doc.setFontSize(12);
        let yPosition = 20;
        for (const [key, value] of Object.entries(artifact)) {
            doc.text(`${translateKey(key)}: ${value}`, 10, yPosition);
            yPosition += 10;
            if (yPosition > 270) { // Pour éviter que le texte dépasse la page
                doc.addPage();
                yPosition = 20;
            }
        }
        if (index !== artifacts.length - 1) {
            doc.addPage();
        }
    });

    doc.save('artifacts.pdf');
}

// Ajouter les boutons pour l'exportation dans la liste des artéfacts
function loadArtifactList() {
    const artifactList = document.getElementById('artifact-list');
    artifactList.innerHTML = '';
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];

    artifacts.forEach(artifact => {
        const artifactItem = document.createElement('div');
        artifactItem.className = 'artifact-item';
        artifactItem.innerHTML = `
            <p><strong>Nom:</strong> ${artifact.name}</p>
            <button onclick="editArtifact(${artifact.id})"><span class="icon">✏️</span> Éditer</button>
            <button onclick="confirmDeleteArtifact(${artifact.id})"><span class="icon">🗑️</span> Supprimer</button>
            <button onclick="downloadArtifactPDF(${artifact.id})"><span class="icon">📄</span> Télécharger en PDF</button>
        `;
        artifactList.appendChild(artifactItem);
    });

    // Ajouter les boutons d'exportation
    const exportCSVButton = document.createElement('button');
    exportCSVButton.textContent = 'Exporter en CSV';
    exportCSVButton.onclick = exportArtifactsToCSV;
    artifactList.appendChild(exportCSVButton);

    const exportJSONButton = document.createElement('button');
    exportJSONButton.textContent = 'Exporter en JSON';
    exportJSONButton.onclick = exportArtifactsToJSON;
    artifactList.appendChild(exportJSONButton);

    const exportPDFButton = document.createElement('button');
    exportPDFButton.textContent = 'Exporter en PDF';
    exportPDFButton.onclick = exportArtifactsToPDF;
    artifactList.appendChild(exportPDFButton);
}

// Fonctionnalités existantes (saveArtifactData, editArtifact, confirmDeleteArtifact, showToast, etc.)

window.onload = function() {
    loadArtifactList();

    // Ajoutez un écouteur pour la barre de recherche
    document.getElementById('search').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const artifactItems = document.querySelectorAll('.artifact-item');
        artifactItems.forEach(item => {
            const name = item.querySelector('p').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}
