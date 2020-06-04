document.addEventListener('DOMContentLoaded', () => {
  // Get element by class.
  const grid = document.querySelector('.grid')
  // Get element by class.
  let squares = Array.from(document.querySelectorAll('.grid div'))
  // Get element by id.
  const scoreDisplay = document.querySelector('#score')
  const startBtn = document.querySelector('#start-button')
  const restartBtn = document.querySelector('#restart-button')
  const width = 10
  let nextRandom = 0
  let timerId
  let score = 0
  const colors = [
    'rgba(220, 20, 60, 0.8)',
    'rgba(255, 105, 180, 0.8)',
    'rgba(255, 99, 71, 0.8)',
    'rgba(255, 218, 185, 0.8)',
    'rgba(238, 130, 238, 0.8)',
    'rgba(173, 255, 47, 0.8)',
    'rgba(135, 206, 235, 0.8)'
  ]

  // The tetriminoes and each array represents the rotation.
  const jTetrimino = [
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetrimino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetrimino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetrimino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetrimino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  // New additions.
  // L-tetrimino  or mirror of J-tetrimino .
  const lTetrimino = [
    [1, width + 1, width * 2 + 1, 0],
    [width, width + 1, width + 2, 2],
    [0, width, width * 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2]
  ]

  // S-tetrimino.
  const sTetrimino = [
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2],
    [width, width + 1, width * 2 + 1, width * 2 + 2]
  ]

  const theTetriminoes = [jTetrimino, zTetrimino, tTetrimino, oTetrimino, iTetrimino, lTetrimino, sTetrimino]

  let currentPosition = 4
  let currentRotation = 0

  // Random selection of tetriminoes and its first rotation.
  let random = Math.floor(Math.random() * theTetriminoes.length)
  let current = theTetriminoes[random][currentRotation]

  // Draw the tetrimino.
  function draw () {
    if (document.getElementById('pause-button')) {
      current.forEach(index => {
        // adding style to each individual tetrimino
        squares[currentPosition + index].classList.add('tetrimino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
      })
    }
  }

  // Undraw the tetrimino.
  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].removeAttribute('class')
      squares[currentPosition + index].removeAttribute('style')
    })
  }

  // Assign fucntions to keyCodes
  function control (e) {
    if (document.getElementById('pause-button')) {
      if (e.keyCode === 37) {
        moveLeft()
      } else if (e.keyCode === 38) {
        rotate()
      } else if (e.keyCode === 39) {
        moveRight()
      } else if (e.keyCode === 40) {
        moveDown()
      }
    }
  }
  document.addEventListener('keyup', control)

  // Move down function.
  function moveDown () {
    if (document.getElementById('pause-button')) {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }
  }

  // Freeze function.
  function freeze () {
    freeze.called = true
    // If some of the squares that make up the current tetrimino, if their index plus
    // the whole width (next space down from each square) contains a square with class name 'taken',
    // then turn each tetrimino square to 'taken'.
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      // Stops tetriminos at the bottom.
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      // Start new tetrimino falling (Set new tetrimino to be current tetrimino).
      random = nextRandom
      nextRandom = Math.floor(Math.random() * theTetriminoes.length)
      current = theTetriminoes[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
    }
  }

  // Move the tetrimino left, unless it is at the edge or there is a blockage.
  function moveLeft () {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) {
      currentPosition -= 1
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  // Move the tetrimino right.
  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

    if (!isAtRightEdge) {
      currentPosition += 1
    }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  // Rotating issue/spill fix.
  function isAtRight () {
    return current.some(index => (currentPosition + index + 1) % width === 0)
  }

  function isAtLeft () {
    return current.some(index => (currentPosition + index) % width === 0)
  }

  function checkRotatedPosition (P) {
    P = P || currentPosition // Get current position. Then, check if the piece is near the left side.
    if ((P + 1) % width < 4) { // Add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
      if (isAtRight()) { // Use actual position to check if it's flipped over to right side.
        currentPosition += 1 // If so, add one to wrap it back around.
        checkRotatedPosition(P) // Check again.  Pass position from start, since long block might need to move more.
      }
    } else if (P % width > 5) {
      if (isAtLeft()) {
        currentPosition -= 1
        checkRotatedPosition(P)
      }
    }
  }

  // Rotate the tetrimino.
  function rotate () {
    undraw()
    currentRotation++
    // If current rotation gets to 4 which is the end, then it restarts.
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = theTetriminoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }

  // Show up-next tetrimino in mini-grid display.
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  const displayIndex = 0
  const upNextTetriminoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2], // jTetrimino's 1st roatation.
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // zTetrimino's 1st rotation.
    [1, displayWidth, displayWidth + 1, displayWidth + 2], // tTetrimino's 1st rotation.
    [0, 1, displayWidth, displayWidth + 1], // oTetrimino's 1st rotation.
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // iTetrimino's 1st rotation.
    [1, displayWidth + 1, displayWidth * 2 + 1, 0], // lTetrimino's 1st rotation.
    [1, displayWidth, displayWidth + 1, displayWidth * 2] // sTetrimino's 1st rotation.
  ]

  // Display the shape in the mini-grid display.
  function displayShape () {
    // Remove any trace of a tetrimino from the entire display grid
    displaySquares.forEach(square => {
      square.removeAttribute('class')
      square.removeAttribute('style')
    })
    // Then display.
    upNextTetriminoes[nextRandom].forEach(index => {
      displaySquares[displayIndex + index].classList.add('tetrimino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

  // Add functionality to Start/Pause button.
  startBtn.addEventListener('click', () => {
    if (document.getElementById('start-button')) {
      document.getElementById('start-button').innerHTML = 'Pause'
      document.getElementById('start-button').classList.remove('start-btn')
      document.getElementById('start-button').classList.add('pause-btn')
      document.getElementById('start-button').id = 'pause-button'
    } else if (document.getElementById('pause-button')) {
      document.getElementById('pause-button').innerHTML = 'Start'
      document.getElementById('pause-button').classList.remove('pause-btn')
      document.getElementById('pause-button').classList.add('start-btn')
      document.getElementById('pause-button').id = 'start-button'
    }
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetriminoes.length)
      displayShape()
    }
  })

  // Add functionality to Restart button.
  restartBtn.addEventListener('click', () => {
    freeze()
    // The pop-up asks to 'OK' or 'Cancel'.
    // This part is if user selects 'OK'.
    if (window.confirm('Are you sure?')) {
      // Change Start button back to start.
      // Stops the game.
      freeze()
      // Lets clean the board.
      restart()
      if (document.getElementById('pause-button')) {
        document.getElementById('pause-button').innerHTML = 'Start'
        document.getElementById('pause-button').classList.remove('pause-btn')
        document.getElementById('pause-button').classList.add('start-btn')
        document.getElementById('pause-button').id = 'start-button'
      }
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetriminoes.length)
      displayShape()
    } else { // This part is if user said 'Cancel,' then the game resumes.
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random() * theTetriminoes.length)
      displayShape()
    }
  })

  // Add score
  function addScore () {
    // Loop over entire grid and all its squares every 10(width) squares.
    for (let i = 0; i < 199; i += width) {
      // Literally every square that makes up a row.
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]

      // If EVERY square in out defined row contains a div with a class of 'taken'.
      if (row.every(index => squares[index].classList.contains('taken'))) {
        // Add 10 to the score as it is full.
        score += 10
        // Display the score to the user.
        scoreDisplay.innerHTML = ' ' + score
        // For each item in the row we remove 'taken'.
        row.forEach(index => {
          squares[index].removeAttribute('class')
          squares[index].removeAttribute('style')
        })
        // Take out the filled row using splice.
        const squaresRemoved = squares.splice(i, width)
        // Re-add the new squares(squaresRemoved) to the grid so it doesnt shrink.
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }
  // Game restart function
  function restart () {
    // Clear score
    score = 0
    // Display score to user
    scoreDisplay.innerHTML = ' ' + score
    // Loop over entire grid and all the squares.
    for (let i = 0; i < 199; i += width) {
      // Squares that make up a row
      const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
      row.forEach(index => {
        squares[index].removeAttribute('class')
        squares[index].removeAttribute('style')
      })
    }
    // Clear out the display grid as well.
    displaySquares.forEach(square => {
      square.removeAttribute('class')
      square.removeAttribute('style')
    })
  }

  // Game over.
  function gameOver () {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerHTML = ' Game over! Your final score was ' + score + '!'
      clearInterval(timerId)
    }
  }
})
