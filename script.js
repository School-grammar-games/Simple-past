const gameObject = document.querySelector('.game-object');
const yesButton = document.querySelector('.yes-button');
const noButton = document.querySelector('.no-button');
const speechBubble = document.querySelector('.speech-bubble');
const newCharacter = document.querySelector('.new-character');
const gameOverImage = document.getElementById('gameOverImage');
const gameContainerWidth = document.querySelector('.game-container').clientWidth;
const gameObjectWidth = gameObject.clientWidth;
let positionX = 0;
const moveSpeed = 3;
const stopPositionX = gameContainerWidth * 0.6;
const characterImageM1 = new Image();
const characterImageM2 = new Image();
const characterImageF1 = new Image();
const characterImageF2 = new Image();

loadAssets(() => console.log('Assets loaded'));

function loadAssets(callback) {
  let assetsLoaded = 0;
  
  function assetLoaded() {
    assetsLoaded++;
    if (assetsLoaded === 4) {
      callback();
    }
  }
  
  characterImageM1.src = 'Character_images/M_char_a.png';
  characterImageM1.onload = assetLoaded;

  characterImageM2.src = 'Character_images/M_char_b.png';
  characterImageM2.onload = assetLoaded;

  characterImageF1.src = 'Character_images/F_char_a.png';
  characterImageF1.onload = assetLoaded;

  characterImageF2.src = 'Character_images/F_char_b.png';
  characterImageF2.onload = assetLoaded;
};

let hasClickedYes = false;
let currentSpeechBubble;
let score = 0;
let selectedCharacter;
let isGameRunning = false;

const speechBubbles = {
  'Du siehst nun zwei Lösungsmöglichkeiten. Klicke auf "Richtig" um die Beispiele anzuzeigen.': 'yes-button',
  'The correct simple past of “to walk”': 'yes-button',
  'The correct simple past of “to sing”': 'no-button',
  'The correct simple past of “to dance”': 'yes-button',
  'The correct simple past of “to read”': 'no-button',
  'The correct simple past of “to write”': 'yes-button',
  'The correct simple past of “to swim”': 'no-button',
  'The correct simple past of “to drive”': 'yes-button',
  'The correct simple past of “to eat”': 'no-button',
  'The correct simple past of “to play”': 'yes-button',
  'The correct simple past of “to drink”': 'no-button',
  'The correct simple past of “to speak”': 'yes-button',
  'The correct simple past of “to break”': 'no-button',
  'The correct simple past of “to buy”': 'yes-button',
  'The correct simple past of “to go”': 'no-button',
  'The correct simple past of “to see”': 'yes-button',
  'The correct simple past of “to teach”': 'no-button',
  'The correct simple past of “to bring”': 'yes-button',
  'The correct simple past of “to think”': 'no-button',
  'The correct simple past of “to wear”': 'yes-button',
  'The correct simple past of “to fly”': 'no-button',
  'The correct simple past of “to draw”': 'yes-button',
  'The correct simple past of “to climb”': 'no-button',
  'The correct simple past of “to smile”': 'yes-button',
  'The correct simple past of “to shout”': 'no-button',
  'The correct simple past of “to shake”': 'yes-button',
  'The correct simple past of “to jump”': 'no-button',
  'The correct simple past of “to throw”': 'yes-button',
  'The correct simple past of “to build”': 'no-button',
  'The correct simple past of “to stand”': 'yes-button',
  'The correct simple past of “to sleep”': 'no-button',
  'The correct simple past of “to slide”': 'yes-button',
  'The correct simple past of “to hit”': 'no-button',
  'The correct simple past of “to cut”': 'yes-button',
  'The correct simple past of “to sell”': 'no-button',
  'The correct simple past of “to tell”': 'yes-button',
  'The correct simple past of “to meet”': 'no-button',
  'The correct simple past of “to hold”': 'yes-button',
  'The correct simple past of “to dream”': 'no-button',
  'The correct simple past of “to hurt”': 'yes-button',
  'The correct simple past of “to fall”': 'no-button',
  'The correct simple past of “to laugh”': 'yes-button',
  'The correct simple past of “to listen”': 'no-button',
  'The correct simple past of “to grow”': 'yes-button',
  'The correct simple past of “to choose”': 'no-button',
  'The correct simple past of “to know”': 'yes-button',
  'The correct simple past of “to feel”': 'no-button',
  'The correct simple past of “to find”': 'yes-button',
  'The correct simple past of “to begin”': 'no-button',
  'The correct simple past of “to keep”': 'yes-button',
  'The correct simple past of “to leave”': 'no-button',
  'The correct simple past of “to put”': 'yes-button',
  'The correct simple past of “to say”': 'no-button',
  'The correct simple past of “to win”': 'yes-button',
  'The correct simple past of “to make”': 'no-button',
  'The correct simple past of “to come”': 'yes-button',
  'The correct simple past of “to pay”': 'no-button',
  'The correct simple past of “to sit”': 'yes-button',
  'The correct simple past of “to lie”': 'no-button',
  'The correct simple past of “to light”': 'yes-button',
  'The correct simple past of “to spread”': 'no-button',
  'The correct simple past of “to bring”': 'yes-button',
  'The correct simple past of “to shoot”': 'no-button',
  'The correct simple past of “to sting”': 'yes-button',
  'The correct simple past of “to bleed”': 'no-button',
  'The correct simple past of “to breed”': 'yes-button',
  'The correct simple past of “to swing”': 'no-button',
  'The correct simple past of “to fling”': 'yes-button',
  'The correct simple past of “to wring”': 'no-button',
  'The correct simple past of “to strive”': 'yes-button'
};

const buttonLabels = {
  'Du siehst nun zwei Lösungsmöglichkeiten. Klicke auf "Richtig" um die Beispiele anzuzeigen.': ['Richtig', 'Falsch'],
  'The correct simple past of “to walk”': ['walked', 'walky'],
  'The correct simple past of “to sing”': ['singed', 'sang'],
  'The correct simple past of “to dance”': ['danced', 'dancen'],
  'The correct simple past of “to read”': ['readed', 'read'],
  'The correct simple past of “to write”': ['wrote', 'writed'],
  'The correct simple past of “to swim”': ['swimmed', 'swam'],
  'The correct simple past of “to drive”': ['drove', 'drived'],
  'The correct simple past of “to eat”': ['eated', 'ate'],
  'The correct simple past of “to play”': ['played', 'playen'],
  'The correct simple past of “to drink”': ['drinked', 'drank'],
  'The correct simple past of “to speak”': ['spoke', 'speaked'],
  'The correct simple past of “to break”': ['breaked', 'broke'],
  'The correct simple past of “to buy”': ['bought', 'buyed'],
  'The correct simple past of “to go”': ['goed', 'went'],
  'The correct simple past of “to see”': ['saw', 'seed'],
  'The correct simple past of “to teach”': ['teached', 'taught'],
  'The correct simple past of “to bring”': ['brought', 'bringed'],
  'The correct simple past of “to think”': ['thinked', 'thought'],
  'The correct simple past of “to wear”': ['wore', 'weared'],
  'The correct simple past of “to fly”': ['flied', 'flew'],
  'The correct simple past of “to draw”': ['drew', 'drawed'],
  'The correct simple past of “to climb”': ['climby', 'climbed'],
  'The correct simple past of “to smile”': ['smiled', 'smiley'],
  'The correct simple past of “to shout”': ['shouten', 'shouted'],
  'The correct simple past of “to shake”': ['shook', 'shaked'],
  'The correct simple past of “to jump”': ['jumpt', 'jumped'],
  'The correct simple past of “to throw”': ['threw', 'throwed'],
  'The correct simple past of “to build”': ['builded', 'built'],
  'The correct simple past of “to stand”': ['stood', 'standed'],
  'The correct simple past of “to sleep”': ['sleeped', 'slept'],
  'The correct simple past of “to slide”': ['slid', 'slided'],
  'The correct simple past of “to hit”': ['hitted', 'hit'],
  'The correct simple past of “to cut”': ['cut', 'cuted'],
  'The correct simple past of “to sell”': ['selled', 'sold'],
  'The correct simple past of “to tell”': ['told', 'telled'],
  'The correct simple past of “to meet”': ['meeted', 'met'],
  'The correct simple past of “to hold”': ['held', 'holded'],
  'The correct simple past of “to dream”': ['dreamen', 'dreamed/dreamt'],
  'The correct simple past of “to hurt”': ['hurt', 'hurten'],
  'The correct simple past of “to fall”': ['falled', 'fell'],
  'The correct simple past of “to laugh”': ['laughed', 'laughen'],
  'The correct simple past of “to listen”': ['listeny', 'listened'],
  'The correct simple past of “to grow”': ['grew', 'growed'],
  'The correct simple past of “to choose”': ['choosed', 'chose'],
  'The correct simple past of “to know”': ['knew', 'knowed'],
  'The correct simple past of “to feel”': ['feeled', 'felt'],
  'The correct simple past of “to find”': ['found', 'finded'],
  'The correct simple past of “to begin”': ['begined', 'began'],
  'The correct simple past of “to keep”': ['kept', 'keeped'],
  'The correct simple past of “to leave”': ['leaved', 'left'],
  'The correct simple past of “to put”': ['put', 'puted'],
  'The correct simple past of “to say”': ['sayed', 'said'],
  'The correct simple past of “to win”': ['won', 'winned'],
  'The correct simple past of “to make”': ['maked', 'made'],
  'The correct simple past of “to come”': ['came', 'comed'],
  'The correct simple past of “to pay”': ['payed', 'paid'],
  'The correct simple past of “to sit”': ['sat', 'sitted'],
  'The correct simple past of “to lie”': ['lay', 'lied'],
  'The correct simple past of “to light”': ['lit', 'lighted'],
  'The correct simple past of “to spread”': ['spready', 'spread'],
  'The correct simple past of “to bring”': ['brought', 'bringed'],
  'The correct simple past of “to shoot”': ['shooted', 'shot'],
  'The correct simple past of “to sting”': ['stung', 'stinged'],
  'The correct simple past of “to bleed”': ['bleeded', 'bled'],
  'The correct simple past of “to breed”': ['bred', 'breeded'],
  'The correct simple past of “to swing”': ['swinged', 'swung'],
  'The correct simple past of “to fling”': ['flung', 'flinged'],
  'The correct simple past of “to wring”': ['wringed', 'wrung'],
  'The correct simple past of “to strive”': ['strove', 'strived']
};

function chooseBubble() {
  const availableKeys = Object.keys(speechBubbles).filter(key => !usedKeys.includes(key));

  if (availableKeys.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableKeys.length);
  const selectedKey = availableKeys[randomIndex];
  usedKeys.push(selectedKey);
  return selectedKey;
}

const usedKeys = [];

function resetUsedKeys() {
  usedKeys.length = 0;
}

const unusedKeys = Object.keys(speechBubbles);

function startGame(character) {
  const characterSelection = document.getElementById('characterSelection');
  characterSelection.style.display = 'none';
  gameObject.style.backgroundImage = `url('Character_images/${character}.png')`;
  gameObject.style.backgroundSize = 'cover';
  document.querySelector('.new-character').style.display = 'block';
  document.querySelector('.speech-bubble').style.display = 'none';
  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  selectedCharacter = character;
  gameLoop();
}

document.querySelectorAll('.character-option').forEach(option => {
  option.addEventListener('click', () => {
    const selectedCharacter = option.dataset.character;
    startGame(selectedCharacter);
  });
});

yesButton.addEventListener('click', () => {
  if (!hasClickedYes) {
    hasClickedYes = true;
    currentSpeechBubble = 'Du siehst nun zwei Lösungsmöglichkeiten. Klicke auf "Richtig" um die Beispiele anzuzeigen.';
    speechBubble.textContent = currentSpeechBubble;
    yesButton.textContent = buttonLabels[currentSpeechBubble][0];
    noButton.textContent = buttonLabels[currentSpeechBubble][1];
  } else {
    checkAnswer('yes-button');
  }
});

noButton.addEventListener('click', () => {
  if (!hasClickedYes) {
    speechBubble.textContent = 'Okay, study the grammar rules again, maybe you can beat your old high score!';
    yesButton.style.display = 'none';
    noButton.textContent = 'Continue';
    noButton.addEventListener('click', () => {
      hasClickedYes = true;
      currentSpeechBubble = 'Du siehst nun zwei Lösungsmöglichkeiten. Klicke auf "Richtig" um die Beispiele anzuzeigen.';
      speechBubble.textContent = currentSpeechBubble;
      yesButton.textContent = buttonLabels[currentSpeechBubble][0];
      noButton.textContent = buttonLabels[currentSpeechBubble][1];
    }, { once: true });
  } else {
    checkAnswer('no-button');
  }
});

function getNextSpeechBubble() {
  if (unusedKeys.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * unusedKeys.length);
  const selectedKey = unusedKeys[randomIndex];
  removeUsedKey(selectedKey);
  return selectedKey;
}

function removeUsedKey(key) {
  const index = unusedKeys.indexOf(key);
  if (index !== -1) {
    unusedKeys.splice(index, 1);
  }
}

function updateScoreDisplay() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: ' + score;

  // check score and update background image and new character image accordingly
  if (score >= 0 && score <= 400) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene1.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char.png');
  } else if (score >= 500 && score <= 800) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene2.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char2.png');
  } else if (score >= 1000 && score <= 1400) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene7.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char7.png');
    removeImageElement(900);
  } else if (score >= 1500 && score <= 1900) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene8.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char8.png');
  } else if (score >= 2100 && score <= 2500) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene4.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char4.png');
    removeImageElement(2000);
  } else if (score >= 2500 && score <= 3100) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene3.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char3.png');
    removeImageElement(3200);
  } else if (score >= 3300 && score <= 3700) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene5.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char5.png');
    removeImageElement(2000);
  } else if (score >= 3700 && score <= 4200) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene6.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char6.png');
    removeImageElement(2000);
  } else if (score >= 4400 && score <= 4900) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene9.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char11.png');
    removeImageElement(2000);
  } else if (score >= 5000 && score <= 5500) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene10.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char9.png');
    removeImageElement(2000);
  } else if (score >= 5700 && score <= 6500) {
    document.querySelector('.game-container').style.backgroundImage = 'url("Background_images/Scene11.png")';
    newCharacter.setAttribute('src', 'Character_images/Q_char10.png');
    removeImageElement(5600);
  }
  
  // add images at 900, 2000, 3200, 4300 and 5600 points
  if (score === 900) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'Transition_images/1to2world.png');
    document.querySelector('.game-container').appendChild(imageElement);
    addContinueButton(900);
  } else if (score === 2000) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'Transition_images/4to5world.png');
    document.querySelector('.game-container').appendChild(imageElement);
    addContinueButton(2000);
  } else if (score === 3200) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'Transition_images/2to3world.png');
    document.querySelector('.game-container').appendChild(imageElement);
    addContinueButton(3200);
  } else if (score === 4300) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'Transition_images/3to4world.png');
    document.querySelector('.game-container').appendChild(imageElement);
    addContinueButton(4300);
  } else if (score === 5600) {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', 'Transition_images/5to6world.png');
    document.querySelector('.game-container').appendChild(imageElement);
    addContinueButton(5600);
  }
}

function removeImageElement(scoreValue) {
  if (scoreValue === 1000 || scoreValue === 2100 || scoreValue === 3300 || scoreValue === 4400 || scoreValue === 5600) {
    const transitionImage1 = document.querySelector('.game-container img[src$="1to2world.png"]');
    if (transitionImage1) {
      transitionImage1.remove();
    }

    const transitionImage2 = document.querySelector('.game-container img[src$="4to5world.png"]');
    if (transitionImage2) {
      transitionImage2.remove();
    }

    const transitionImage3 = document.querySelector('.game-container img[src$="2to3world.png"]');
    if (transitionImage3) {
      transitionImage3.remove();
    }

    const transitionImage4 = document.querySelector('.game-container img[src$="3to4world.png"]');
    if (transitionImage4) {
      transitionImage4.remove();
    }

    const transitionImage5 = document.querySelector('.game-container img[src$="5to6world.png"]');
    if (transitionImage5) {
      transitionImage5.remove();
    }
  }
}

function addContinueButton(scoreValue) {
  const continueButton = document.createElement('button');
  continueButton.textContent = 'Continue';
  continueButton.classList.add('continue-button');
  continueButton.addEventListener('click', () => {
    score += 100; // Update the global score variable
    updateScoreDisplay();
    removeImageElement(score); // Call the removeImageElement function with the updated global score
    continueButton.remove();
  });

  if (scoreValue === 900 || scoreValue === 2000 || scoreValue === 3200 || scoreValue === 4300 || scoreValue === 5600) {
    document.querySelector('.game-container').appendChild(continueButton);
  }
}

function showGameOverImage() {
  const gameOverImage = document.createElement('img');
  gameOverImage.setAttribute('id', 'gameOverImage');

  if (selectedCharacter === 'F_char') {
    gameOverImage.setAttribute('src', 'Finish_images/F_char_lose.png');
  } else if (selectedCharacter === 'M_char') {
    gameOverImage.setAttribute('src', 'Finish_images/M_char_lose.png');
  }

  document.querySelector('.game-over-container').appendChild(gameOverImage);
}

function showWinGameImage() {
  const winGameImage = document.createElement('img');
  winGameImage.setAttribute('id', 'winGameImage');

  if (selectedCharacter === 'F_char') {
    winGameImage.setAttribute('src', 'Finish_images/F_char_win.png');
  } else if (selectedCharacter === 'M_char') {
    winGameImage.setAttribute('src', 'Finish_images/M_char_win.png');
  }

  document.querySelector('.game-over-container').appendChild(gameOverImage);
}
function checkAnswer(clickedButton) {
  if (speechBubbles[currentSpeechBubble] === clickedButton) {
    score += 100;
    updateScoreDisplay();

    speechBubble.textContent = 'Correct!';
    currentSpeechBubble = chooseBubble();
    if (currentSpeechBubble) {
      setTimeout(() => {
        speechBubble.textContent = currentSpeechBubble;
        yesButton.textContent = buttonLabels[currentSpeechBubble][0];
        noButton.textContent = buttonLabels[currentSpeechBubble][1];
      }, 1500);
    } else {
      gameOver(true);
    }
  } else {
    gameOver(false);
  }
}

function gameOver(isWin) {
  if (isWin) {
    speechBubble.textContent = 'Congratulations, you have completed the game!';
  } else {
    speechBubble.textContent = 'Incorrect! Game Over.';
  }

  yesButton.style.display = 'none';
  noButton.style.display = 'none';
  document.querySelector('.game-container').style.display = 'none';
  document.querySelector('.game-over-container').style.display = 'block';

  showGameOverImage();
  showFinalScore();
  document.getElementById('replayButton').style.display = 'block'; // Show the "Replay" button
}

function showFinalScore() {
  const finalScoreElement = document.createElement('div');
  finalScoreElement.setAttribute('id', 'finalScore');
  finalScoreElement.textContent = 'Final Score: ' + score;
  document.querySelector('.game-over-container').appendChild(finalScoreElement);
}

function resetGame() {
  document.querySelector('.game-container').style.display = 'block';
  document.querySelector('.game-over-container').style.display = 'none';
  document.getElementById('gameOverImage').style.display = 'none';
  document.getElementById('finalScore').remove();

  positionX = 0;
  score = 0;
  updateScoreDisplay();
  hasClickedYes = false;
  currentSpeechBubble = Object.keys(speechBubbles)[0];
  yesButton.textContent = 'Yes';
  noButton.textContent = 'No';
  yesButton.style.display = 'block';
  noButton.style.display = 'block';
  speechBubble.textContent = 'Hello! Welcome to the game! To continue you need to choose the present perfect or the simple past. Here\'s the first task, are you ready?';

  resetUsedKeys(); // Add this line to reset usedKeys array when the game is reset
  isGameRunning = false;
  moveSpeed = 3; // reset the moveSpeed to its initial value
  gameLoop();
}

let frameCounter = 0;
const framesPerSwitch = 15;

function gameLoop() {
  if (!isGameRunning) {
    isGameRunning = true;
  }

  positionX += moveSpeed;

  if (positionX > stopPositionX) {
    positionX = stopPositionX;
    document.querySelector('.speech-bubble').style.display = 'block';
    yesButton.style.display = 'block';
    noButton.style.display = 'block';
  } else {
    // Increment the frame counter
    frameCounter++;

    // Switch the character image based on the frame counter
    if (frameCounter >= framesPerSwitch * 2) {
      frameCounter = 0;
    }

    if (selectedCharacter === 'F_char') {
      gameObject.style.backgroundImage = `url('Character_images/${frameCounter < framesPerSwitch ? 'F_char_a' : 'F_char_b'}.png')`;
    } else if (selectedCharacter === 'M_char') {
      gameObject.style.backgroundImage = `url('Character_images/${frameCounter < framesPerSwitch ? 'M_char_a' : 'M_char_b'}.png')`;
    }
  }

  gameObject.style.left = positionX + 'px';
  gameObject.style.bottom = '5%';
  requestAnimationFrame(gameLoop);
}

document.getElementById('replayButton').addEventListener('click', () => {
  resetGame();
});

