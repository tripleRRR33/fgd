function downloadCharacterPDF(id) {
    const characters = JSON.parse(localStorage.getItem('characters')) || [];
    const character = characters.find(c => c.id === id);
    if (character) {
        const characterSheet = document.createElement('div');
        characterSheet.className = 'character-sheet';
        characterSheet.style.display = 'none'; // Masquer l'élément
        Object.entries(character).forEach(([key, value]) => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            characterSheet.appendChild(p);
        });

        document.body.appendChild(characterSheet); // Ajouter temporairement au DOM

        html2canvas(characterSheet).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`fiche_personnage_${id}.pdf`);

            document.body.removeChild(characterSheet); // Retirer du DOM après génération
        }).catch(error => {
            console.error('Erreur lors de la génération du PDF:', error);
            alert('Échec du téléchargement de la fiche. Veuillez réessayer.');
        });
    } else {
        alert('Personnage non trouvé. Veuillez réessayer.');
    }
}
