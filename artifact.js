// Fonction pour enregistrer un artéfact dans le localStorage
function saveArtifactData() {
    const artifact = {
        id: Date.now(),
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        origin: document.getElementById('origin').value,
        appearance: document.getElementById('appearance').value,
        size: document.getElementById('size').value,
        materials: document.getElementById('materials').value,
        'visual-features': document.getElementById('visual-features').value,
        'main-power': document.getElementById('main-power').value,
        'side-effects': document.getElementById('side-effects').value,
        limits: document.getElementById('limits').value,
        'activation-conditions': document.getElementById('activation-conditions').value,
        'character-usefulness': document.getElementById('character-usefulness').value,
        'story-importance': document.getElementById('story-importance').value,
        'associated-conflicts': document.getElementById('associated-conflicts').value,
        creator: document.getElementById('creator').value,
        'key-events': document.getElementById('key-events').value,
        evolution: document.getElementById('evolution').value,
        benefits: document.getElementById('benefits').value,
        'negative-effects': document.getElementById('negative-effects').value,
        compatibility: document.getElementById('compatibility').value,
        'story-links': document.getElementById('story-links').value,
        mythology: document.getElementById('mythology').value,
        'character-reactions': document.getElementById('character-reactions').value,
        'associated-quote': document.getElementById('associated-quote').value,
        symbolism: document.getElementById('symbolism').value,
        'visual-effects': document.getElementById('visual-effects').value,
        'associated-objects': document.getElementById('associated-objects').value,
        'contextual-description': document.getElementById('contextual-description').value,
        alterations: document.getElementById('alterations').value,
        'new-secrets': document.getElementById('new-secrets').value,
        'hero-evolution-link': document.getElementById('hero-evolution-link').value
    };

    let artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    artifacts.push(artifact);
    localStorage.setItem('artifacts', JSON.stringify(artifacts));
    alert('Artéfact enregistré avec succès!');
    loadArtifactList();
}

// Fonction de vérification si des artéfacts existent avant l'exportation
function checkArtifactsExist() {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    if (artifacts.length === 0) {
        alert('Aucun artéfact à exporter.');
        return false;
    }
    return true;
}

// Modifier les fonctions d'exportation pour vérifier si des artéfacts existent avant de procéder
function exportArtifactsToCSV() {
    if (!checkArtifactsExist()) return;

    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
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

function exportArtifactsToJSON() {
    if (!checkArtifactsExist()) return;

    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    const jsonString = JSON.stringify(artifacts, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artifacts.json';
    a.click();
    URL.revokeObjectURL(url);
}

function exportArtifactsToPDF() {
    if (!checkArtifactsExist()) return;

    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
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
            "hero-evolution-link": "Lien avec l’évolution du héros"
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
