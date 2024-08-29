import { IVector } from '../../types/IVector';

export default class Paddle {
  private paddleImage: HTMLImageElement = new Image();
  private moveLeft: boolean = false;
  private moveRight: boolean = false;

  constructor(
    private _speed: number,
    private paddleWidth: number,
    private paddleHeight: number,
    private _position: IVector,
    image: string
  ) {
    this._speed = _speed;
    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
    this.paddleImage.src = image;
    this._position = _position;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'ArrowLeft' || e.key === 'ArrowLeft') {
      this.moveLeft = true;
      this.moveRight = false;
    } else if (e.code === 'ArrowRight' || e.key === 'ArrowRight') {
      this.moveLeft = false;
      this.moveRight = true;
    }
  };

  handleKeyUp = (e: KeyboardEvent): void => {
    this.moveLeft = false;
    this.moveRight = false;
  };

  //Getters

  get width(): number {
    return this.paddleWidth;
  }

  get height(): number {
    return this.paddleHeight;
  }

  get speed(): number {
    return this._speed;
  }

  get image(): HTMLImageElement {
    return this.paddleImage;
  }

  get pos(): IVector {
    return this._position;
  }

  get isMovingLeft(): boolean {
    return this.moveLeft;
  }

  get isMovingRight(): boolean {
    return this.moveRight;
  }

  movePaddle(): void {
    if (this.moveLeft) {
      this.pos.x -= this.speed;
    } else {
      this.pos.x += this.speed;
    }
  }
}
