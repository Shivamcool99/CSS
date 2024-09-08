let votes = {
    president: {},
    committee: {},
    'vice-president': {},
    secretary: {}
};

function vote(position, candidate) {
    if (!votes[position][candidate]) {
        votes[position][candidate] = 0;
    }
    votes[position][candidate]++;
    alert(Voted for ${candidate} as ${position});
}

function showResults() {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    Object.keys(votes).forEach(position => {
        let winner = '';
        let maxVotes = 0;

        Object.keys(votes[position]).forEach(candidate => {
            if (votes[position][candidate] > maxVotes) {
                maxVotes = votes[position][candidate];
                winner = candidate;
            }
        });

        const li = document.createElement('li');
        li.textContent = ${position.charAt(0).toUpperCase() + position.slice(1)}: ${winner} with ${maxVotes} votes;
        resultsList.appendChild(li);
    });

    document.getElementById('results-section').classList.remove('hidden');
}
