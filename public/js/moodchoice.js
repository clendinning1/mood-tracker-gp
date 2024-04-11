const handleMoodChoice = async (selectedMood) => {
    if (!selectedMood) {
        console.error("Selected mood is null or empty.");
        return;
    }

    const data = { mood: selectedMood };
    try {
        const response = await fetch('/moodpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Mood choice has been sent');
        } else {
            console.error('Failed to send mood choice');
        }
    } catch (error) {
        console.error('Error sending mood choice:', error);
    }
};

document.querySelector('.mood-options').addEventListener('click', (event) => {
    if (event.target.classList.contains('mood-option')) {
        const selectedMood = event.target.textContent.trim(); 
        handleMoodChoice(selectedMood); 
    }
});

