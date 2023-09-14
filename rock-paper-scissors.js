let score = JSON.parse(localStorage.getItem('score')) || {
     wins: 0,
     losses: 0,
     ties: 0
};


updateScoreElement();

let isAutoPlaying = false;
let intervelId;

document.querySelector('.js-auto-play')
     .addEventListener('click', () => {
          autoplay();
     });

document.querySelector('.js-reset-btn')
     .addEventListener('click', () => {
          const resetMsg = document.querySelector('.js-reset-msg');

          resetMsg.innerHTML = `Are you sure you want to reset the score?&nbsp;<button class="js-yes-btn">Yes</button> &nbsp;<button class="js-no-btn">No</button>`

          clearInterval(intervelId);
          isAutoPlaying = false;
          document.querySelector('.js-auto-play')
               .innerHTML = 'auto play';
     });


function autoplay() {
     if (!isAutoPlaying) {
          intervelId = setInterval(() => {

               let playerMove = pickComputerMove();
               playGame(playerMove);
               updateScoreElement();
               // console.log(playerMove);

          }, 1000);
          isAutoPlaying = true;
          document.querySelector('.js-auto-play')
               .innerHTML = 'stop playing';
     } else {
          clearInterval(intervelId);
          isAutoPlaying = false;
          document.querySelector('.js-auto-play')
               .innerHTML = 'auto play';
     }

};

document.querySelector('.js-rock-btn')
     .addEventListener('click', () => {
          playGame('rock');

     });
document.querySelector('.js-paper-btn')
     .addEventListener('click', () => {
          playGame('paper');

     });
document.querySelector('.js-scissors-btn')
     .addEventListener('click', () => {
          playGame('scissors');

     });

document.body.addEventListener('keydown', (event) => {
     if (event.key === 'r') {
          playGame('rock');
     } else if (event.key === 'p') {
          playGame('paper');
     } else if (event.key === 's') {
          playGame('scissors');
     } else if (event.key === 'a') {
          autoplay();
     } else if (event.key === 'Backspace') {
          const resetMsg = document.querySelector('.js-reset-msg');
          resetMsg.innerHTML = `Are you sure you want to reset the score?&nbsp;<button class="js-yes-btn">Yes</button> &nbsp;<button class="js-no-btn">No</button>`;
          clearInterval(intervelId);
          isAutoPlaying = false;
          document.querySelector('.js-auto-play')
               .innerHTML = 'auto play';
          // Handle the "Yes" button click
          const yesBtn = document.querySelector('.js-yes-btn');
          if (yesBtn) {
               yesBtn.addEventListener('click', () => {
                    // Trigger the reset functionality
                    score = {
                         wins: 0,
                         losses: 0,
                         ties: 0
                    };
                    updateScoreElement();
                    localStorage.removeItem('score');
                    resetMsg.innerHTML = ''; // Clear the message
               });
          }

          // Handle the "No" button click
          const noBtn = document.querySelector('.js-no-btn');
          if (noBtn) {
               noBtn.addEventListener('click', () => {
                    resetMsg.innerHTML = ''; // Clear the message
               });
          }
     }

});
// });
// document.body.addEventListener('keydown',(event)=>{



// }
// });


document.addEventListener('click', () => {
     const nobtn = document.querySelector('.js-no-btn');
     if (nobtn) {
          nobtn.addEventListener('click', () => {
               document.querySelector('.js-reset-msg')
                    .innerHTML = '';
          });
     }
});
document.addEventListener('click', () => {
     const yesbtn = document.querySelector('.js-yes-btn');

     if (yesbtn) {
          yesbtn.addEventListener('click', () => {
               score = {
                    wins: 0,
                    losses: 0,
                    ties: 0
               };
               updateScoreElement();
               localStorage.removeItem('score');
               document.querySelector('.js-reset-msg')
                    .innerHTML = '';
          });
     }
});
function playGame(playerMove) {
     const computerMove = pickComputerMove();

     let result = '';

     if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
               result = 'You lose.';
          } else if (computerMove === 'paper') {
               result = 'You win.';
          } else if (computerMove === 'scissors') {
               result = 'Tie.';
          }

     } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
               result = 'You win.';
          } else if (computerMove === 'paper') {
               result = 'Tie.';
          } else if (computerMove === 'scissors') {
               result = 'You lose.'
          }

     } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
               result = 'Tie.';
          } else if (computerMove === 'paper') {
               result = 'You lose.';
          } else if (computerMove === 'scissors') {
               result = 'You win.';
          }

     }

     if (result === 'You win.') {
          score.wins += 1;
     } else if (result === 'You lose.') {
          score.losses += 1;
     } else if (result === 'Tie.') {
          score.ties += 1;
     }

     localStorage.setItem('score', JSON.stringify(score));

     updateScoreElement();

     document.querySelector('.js-result')
          .innerHTML = result;

     document.querySelector('.js-moves')
          .innerHTML = `you
<img src="images/${playerMove}-emoji.png" class="move-icon"> 
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;



}


function updateScoreElement() {
     document.querySelector('.js-score')
          .innerHTML = `🏆 wins : ${score.wins}   💔 Losses : ${score.losses}   🤝 Ties : ${score.ties}`;
}
function pickComputerMove() {
     randomNumber = Math.random();

     let computerMove = '';


     if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';

     } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';

     } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';

     }
     return computerMove;
}