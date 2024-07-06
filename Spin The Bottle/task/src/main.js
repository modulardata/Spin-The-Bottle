// Array of players
const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6"];
// Random player selection
let randomPlayer = () => players[Math.floor(Math.random() * players.length)]
// Spin the wheel
let spinTheWheel = () => {
    // Spinning animation
    document.getElementById('status').innerHTML = "Spinning..."
    // Set a timeout 2 seconds
    setTimeout(()=>{
        const chosenPlayer = randomPlayer()
        document.getElementById('status').innerHTML = `Selected player: ${chosenPlayer}.`
    }, 2000);
}

// Event listener for spin button
document.getElementById('spin').addEventListener('click', spinTheWheel)








