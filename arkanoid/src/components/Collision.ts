import Ball from './sprites/Ball';
import Brick from './sprites/Brick';
import Paddle from './sprites/Paddle';
import CanvasView from './view/CanvasView';

export default class Collision {
  static checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      ball.changeYDirection();
    }

    if (ball.pos.x + ball.width > view.canvas.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }

    if (ball.pos.y < 0) ball.changeYDirection();
  }

  static isBrickCollision(ball: Ball, brick: Brick): boolean {
    if (
      ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y
    ) {
      return true;
    }

    return false;
  }

  static isBricksCollision(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;

    bricks.forEach((brick, i) => {
      if (this.isBrickCollision(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;
        }

        colliding = true;
      }
    });

    return colliding;
  }
}
