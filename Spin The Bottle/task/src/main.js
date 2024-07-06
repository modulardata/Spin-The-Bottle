const players = []
const addPlayer = (name) => {
	players.push(name)
	const playersList = document.getElementById('players')
	const newListItem = document.createElement('li')
	newListItem.textContent = name
	playersList.appendChild(newListItem)
}

document.getElementById('add-player').addEventListener('click', (e) => {
	e.preventDefault()
	const name = document.getElementById('player-name').value
	document.getElementById('status').innerHTML = "Spin the bottle!"
	if (!name) {
		alert('Please enter a player name')
	} else if (players.includes(name)) {
		// const playersList = document.getElementById('players')
		document.getElementById('status').innerHTML = "Player already exists!"
	} else {
		addPlayer(name)
		document.getElementById('player-name').value = ''
		for (const sElement of playersList.children) {
			sElement.textContent = name
		}
	}

})

const randomPlayer = () => {
	return players[Math.floor(Math.random() * players.length)]
}

const spinTheWheel = () => {
	document.getElementById('status').innerHTML = "Spinning..."
	setTimeout(() => {
		const chosenPlayer = randomPlayer()
		document.getElementById('status').innerHTML = `Selected player: ${chosenPlayer}.`
	}, 2000);
}

document.getElementById('spin').addEventListener('click', spinTheWheel)