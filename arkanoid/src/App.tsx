import './App.css';

import {
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_STARTX,
  PADDLE_SPEED,
  PADDLE_IMAGE,
  BALL_SIZE,
  BALL_SPEED,
  BALL_STARTX,
  BALL_STARTY,
  BALL_IMAGE,
} from './setup';
import CanvasView from './components/view/CanvasView';
import Brick from './components/sprites/Brick';
import Paddle from './components/sprites/Paddle';
import Ball from './components/sprites/Ball';
import createBricks from './helpers/createBricks';
import { useEffect } from 'react';
import Collision from './components/Collision';

let gameOver = false;
let gameWin = false;
let score = 0;
let requestAnimationFrameId: number = 0;

function setGameOver(view: CanvasView): void {
  view.drawInfo('Game Over');
}

function setGameWin(view: CanvasView): void {
  view.drawInfo('Game Won!');
}

function gameLoop(view: CanvasView, bricks: Brick[], paddle: Paddle, ball: Ball): void {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);

  //Move paddle
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x + paddle.width < view.canvas.width)
  ) {
    paddle.movePaddle();
  }

  ball.moveBall();
  Collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = Collision.isBricksCollision(ball, bricks);

  if (collidingBrick) {
    console.log('before', score);
    score += 1;
    console.log('after', score);
    view.drawScore(score);
  }

  if (ball.pos.y > view.canvas.height) {
    gameOver = true;
    setGameOver(view);
  }
  if (!bricks.length) {
    gameWin = true;
    setGameWin(view);
  }

  if (gameOver || gameWin) {
    cancelAnimationFrame(requestAnimationFrameId);
    gameOver = gameWin = false;
  }

  requestAnimationFrameId = requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball));
}

function startGame(view: CanvasView): void {
  // reset
  score = 0;
  view.drawInfo('');
  view.drawScore(score);

  // create bricks
  const bricks = createBricks();

  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    { x: PADDLE_STARTX, y: view.canvas.height - PADDLE_HEIGHT - 5 },
    PADDLE_IMAGE
  );

  const ball = new Ball(
    BALL_SIZE,
    {
      x: BALL_STARTX,
      y: BALL_STARTY,
    },
    BALL_SPEED,
    BALL_IMAGE
  );

  gameLoop(view, bricks, paddle, ball);
}

function App() {
  useEffect(() => {
    // Create a new view
    const view = new CanvasView('playField');
    view.initStartButton(startGame);
  }, []);

  return (
    <div className='App'>
      <div id='main' className='main'>
        <canvas id='playField' width='1000' height='600'></canvas>
        <img id='background' src='/assets/images/background.png' alt='playground-background' />
        <div id='display'>
          <div id='score'></div>
          <button id='start'>Start</button>
          <div id='info'>Press play!</div>
        </div>
      </div>
    </div>
  );
}

export default App;
