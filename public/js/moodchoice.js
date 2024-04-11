// Function to handle mood choice
const handleMoodChoice = async (selectedMood) => {
    console.log('handleMoodChoice function called');
    console.log('Selected emoji:', selectedMood);
    if (!selectedMood) {
        console.error("Selected mood is null or empty.");
        return;
    }

    console.log("Selected emoji:", selectedMood); 

    const data = { mood: selectedMood };
    console.log(data);
    console.log('data above');
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

document.querySelectorAll('.mood-option').forEach(button => {
    button.addEventListener('click', (event) => {
        console.log('click event triggered')
        const selectedEmoji = button.getAttribute('data-emoji');
        console.log('Selected Emoji:', selectedEmoji)
        chooseMood(selectedEmoji);
    });
});

function chooseMood(emoji) {
    console.log('choose mood function called')
    console.log('You chose: ' + emoji);
    handleMoodChoice(emoji);
}








