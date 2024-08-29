import { BALL_SPEED } from '../../setup';
import { IVector } from '../../types/IVector';
export default class Ball {
  private ballSpeed: IVector;
  private ballImage: HTMLImageElement = new Image();

  constructor(private ballSize: number, private position: IVector, speed: number, image: string) {
    this.ballSize = ballSize;
    this.position = position;
    this.ballSpeed = {
      x: speed,
      y: -speed,
    };
    this.ballImage.src = image;
  }

  // Getters

  get width(): number {
    return this.ballSize;
  }

  get height(): number {
    return this.ballSize;
  }

  get pos(): IVector {
    return this.position;
  }

  get speed(): IVector {
    return this.ballSpeed;
  }

  get image(): HTMLImageElement {
    return this.ballImage;
  }

  // Methods

  changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }

  moveBall(): void {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}
