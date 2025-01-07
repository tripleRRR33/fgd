function saveCharacterData() {
    const characterData = {
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
    localStorage.setItem('characterData', JSON.stringify(characterData));
    alert('Données enregistrées!');
}

function downloadPDF() {
    html2canvas(document.getElementById('character-sheet')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('fiche_personnage.pdf');
    });
}

window.onload = function() {
    if (localStorage.getItem('characterData')) {
        const characterData = JSON.parse(localStorage.getItem('characterData'));
        for (const key in characterData) {
            if (characterData.hasOwnProperty(key)) {
                document.getElementById(key).value = characterData[key];
            }
        }
    }
}
