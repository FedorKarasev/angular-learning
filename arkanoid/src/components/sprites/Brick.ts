import { IVector } from '../../types/IVector';

export default class Brick {
  private brickImage: HTMLImageElement = new Image();

  constructor(
    private brickWidth: number,
    private brickHeight: number,
    private brickPosition: IVector,
    private brickEnergy: number,
    image: string
  ) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickEnergy = brickEnergy;
    this.brickPosition = brickPosition;
    this.brickImage.src = image;
  }

  // Getters

  get width(): number {
    return this.brickWidth;
  }

  get height(): number {
    return this.brickHeight;
  }

  get energy(): number {
    return this.brickEnergy;
  }

  get pos(): IVector {
    return this.brickPosition;
  }

  get image(): HTMLImageElement {
    return this.brickImage;
  }

  // Setters

  set energy(energy) {
    this.brickEnergy = energy;
  }
}
