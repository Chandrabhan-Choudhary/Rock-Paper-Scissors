let score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};

updateScoreElement();

/*
if (!score)
{
    score = {
        wins : 0,
        losses : 0,
        ties : 0
    };
}
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay()
{
    if (!isAutoPlaying)
    {
        intervalId = setInterval(() =>
            {
                const playerMove = pickComputerMove();
                playGame(playerMove);
            },
            1000    /* 1 second */ )
            isAutoPlaying = true;
    }
    else
    {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-btn')
    .addEventListener('click', () =>
    {
        playGame('rock');
    });
document.querySelector('.js-paper-btn')
    .addEventListener('click', () =>
    {
        playGame('paper');
    });
document.querySelector('.js-scissors-btn')
    .addEventListener('click', () =>
    {
        playGame('scissors');
    });
document.querySelector('.js-reset-score-btn')
    .addEventListener('click', () =>
    {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score');
            updateScoreElement();
    });
document.querySelector('.js-auto-play-btn')
    .addEventListener('click', () =>
    {
        autoPlay();
    });
document.body.addEventListener('keydown', (event) =>
    {
        if (event.key === 'r')
        {
            playGame('rock');
        }
        else if (event.key === 'p')
        {
            playGame('paper');
        }
        else if (event.key === 's')
        {
            playGame('scissors');
        }
    });

function playGame(playerMove)
{
    const computerMove=pickComputerMove();

    let result='';
    if (playerMove === 'rock')
    {
        if (computerMove === 'rock')
        {
            result = 'Tie';
        }
        else if (computerMove === 'paper')
        {
            result = 'You lose';
        }
        else
        {
            result = 'You win';
        }
    }

    else if (playerMove === 'paper')
    {
        if (computerMove === 'rock')
        {
            result = 'You win';
        }
        else if (computerMove === 'paper')
        {
            result = 'Tie';
        }
        else
        {
            result = 'You lose';
        }
    }

    else
    {
        if (computerMove === 'rock')
        {
            result = 'You lose';
        }
        else if (computerMove === 'paper')
        {
            result = 'You win';
        }
        else
        {
            result = 'Tie'
        }
    }

    if (result === 'You win')
    {
        score.wins++;
    }
    else if (result === 'You lose')
    {
        score.losses++;
    }
    else 
    {
        score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You 
    <img class="move-icon" src="${playerMove}-emoji.png"> - 
    Computer <img class="move-icon" src="${computerMove}-emoji.png">`;
}

function updateScoreElement()
{
    document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}. Losses : ${score.losses}. Ties : ${score.ties}`;
}

function pickComputerMove()
{
    const randomNumber=Math.random();
    let computerMove='';
    if (randomNumber >= 0 && randomNumber < 1/3)
    {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3)
    {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2/3 && randomNumber < 1)
    {
        computerMove = 'scissors';
    }
    return computerMove;
}
