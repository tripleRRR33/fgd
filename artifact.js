function saveArtifactData() {
    const artifactData = {
        id: Date.now(), // Unique ID for each artifact
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        origin: document.getElementById('origin').value,
        appearance: document.getElementById('appearance').value,
        size: document.getElementById('size').value,
        materials: document.getElementById('materials').value,
        visualFeatures: document.getElementById('visual-features').value,
        mainPower: document.getElementById('main-power').value,
        sideEffects: document.getElementById('side-effects').value,
        limits: document.getElementById('limits').value,
        activationConditions: document.getElementById('activation-conditions').value,
        characterUsefulness: document.getElementById('character-usefulness').value,
        storyImportance: document.getElementById('story-importance').value,
        associatedConflicts: document.getElementById('associated-conflicts').value,
        creator: document.getElementById('creator').value,
        keyEvents: document.getElementById('key-events').value,
        evolution: document.getElementById('evolution').value,
        benefits: document.getElementById('benefits').value,
        negativeEffects: document.getElementById('negative-effects').value,
        compatibility: document.getElementById('compatibility').value,
        storyLinks: document.getElementById('story-links').value,
        mythology: document.getElementById('mythology').value,
        characterReactions: document.getElementById('character-reactions').value,
        associatedQuote: document.getElementById('associated-quote').value,
        symbolism: document.getElementById('symbolism').value,
        visualEffects: document.getElementById('visual-effects').value,
        associatedObjects: document.getElementById('associated-objects').value,
        contextualDescription: document.getElementById('contextual-description').value,
        alterations: document.getElementById('alterations').value,
        newSecrets: document.getElementById('new-secrets').value,
        heroEvolutionLink: document.getElementById('hero-evolution-link').value
    };

    let artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    artifacts.push(artifactData);
    localStorage.setItem('artifacts', JSON.stringify(artifacts));
    alert('Données enregistrées!');
    loadArtifactList();
}

function loadArtifactList() {
    const artifactList = document.getElementById('artifact-list');
    artifactList.innerHTML = '';
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];

    artifacts.forEach(artifact => {
        const artifactItem = document.createElement('div');
        artifactItem.className = 'artifact-item';
        artifactItem.innerHTML = `
            <p><strong>Nom:</strong> ${artifact.name}</p>
            <button onclick="editArtifact(${artifact.id})">Éditer</button>
            <button onclick="deleteArtifact(${artifact.id})">Supprimer</button>
            <button onclick="downloadArtifactPDF(${artifact.id})">Télécharger en PDF</button>
        `;
        artifactList.appendChild(artifactItem);
    });
}

function editArtifact(id) {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    const artifact = artifacts.find(a => a.id === id);
    if (artifact) {
        for (const key in artifact) {
            if (artifact.hasOwnProperty(key) && document.getElementById(key)) {
                document.getElementById(key).value = artifact[key];
            }
        }
    }
}

function deleteArtifact(id) {
    let artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    artifacts = artifacts.filter(a => a.id !== id);
    localStorage.setItem('artifacts', JSON.stringify(artifacts));
    loadArtifactList();
}

function downloadArtifactPDF(id) {
    const artifacts = JSON.parse(localStorage.getItem('artifacts')) || [];
    const artifact = artifacts.find(a => a.id === id);
    if (artifact) {
        const artifactSheet = document.createElement('div');
        artifactSheet.className = 'artifact-sheet';
        for (const key in artifact) {
            if (artifact.hasOwnProperty(key)) {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${artifact[key]}`;
                artifactSheet.appendChild(p);
            }
        }

        html2canvas(artifactSheet).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`fiche_artifact_${id}.pdf`);
        });
    }
}

window.onload = function() {
    loadArtifactList();
}
