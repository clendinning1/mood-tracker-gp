// Function to handle mood choice
const handleMoodChoice = async (selectedMood) => {
    if (!selectedMood) {
        console.error("Selected mood is null or empty.");
        return;
    }

    console.log("Selected emoji:", selectedMood); 

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

function chooseMood(emoji) {
    console.log('You chose: ' + emoji);
    handleMoodChoice(emoji);
}

document.querySelector('.mood-options').addEventListener('click', (event) => {
    if (event.target.classList.contains('mood-option')) {
        const selectedEmoji = event.target.getAttribute('data-emoji');
        chooseMood(selectedEmoji);
    }
});






