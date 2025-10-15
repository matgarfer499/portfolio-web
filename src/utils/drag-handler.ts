interface DragState {
  element: HTMLElement;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
  rotation: string;
  lastX: number;
  lastY: number;
  lastTime: number;
  velocityX: number;
  velocityY: number;
}

interface DragConfig {
  onPhotoMoved?: (index: number) => void;
  moveThreshold?: number;
  velocityMultiplier?: number;
  friction?: number;
  minVelocity?: number;
  speedThreshold?: number;
}

export class DragHandler {
  private dragState: DragState | null = null;
  private config: Required<DragConfig>;

  constructor(config: DragConfig = {}) {
    this.config = {
      onPhotoMoved: config.onPhotoMoved || (() => {}),
      moveThreshold: config.moveThreshold || 150,
      velocityMultiplier: config.velocityMultiplier || 0.3,
      friction: config.friction || 0.92,
      minVelocity: config.minVelocity || 0.3,
      speedThreshold: config.speedThreshold || 1,
    };
  }

  public initialize(selector: string): void {
    document.querySelectorAll(selector).forEach((card) => {
      const element = card as HTMLElement;
      element.addEventListener('mousedown', this.onMouseDown.bind(this) as EventListener);
    });

    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private onMouseDown(e: MouseEvent): void {
    const target = (e.target as HTMLElement).closest('.polaroid-card') as HTMLElement;
    if (!target) return;

    e.preventDefault();

    const currentLeft = parseFloat(target.style.left || '0');
    const currentTop = parseFloat(target.style.top || '0');

    const match = target.style.transform.match(/rotate\(([^)]+)\)/);
    const rotation = match ? match[1] : '0deg';

    this.dragState = {
      element: target,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentLeft,
      initialY: currentTop,
      rotation,
      lastX: e.clientX,
      lastY: e.clientY,
      lastTime: Date.now(),
      velocityX: 0,
      velocityY: 0,
    };

    target.style.cursor = 'grabbing';
    target.style.zIndex = '1000';

    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.dragState) return;

    e.preventDefault();

    const currentTime = Date.now();
    const deltaTime = currentTime - this.dragState.lastTime;

    if (deltaTime > 0) {
      const rawVelocityX = ((e.clientX - this.dragState.lastX) / deltaTime) * 16;
      const rawVelocityY = ((e.clientY - this.dragState.lastY) / deltaTime) * 16;

      this.dragState.velocityX = rawVelocityX * this.config.velocityMultiplier;
      this.dragState.velocityY = rawVelocityY * this.config.velocityMultiplier;
    }

    this.dragState.lastX = e.clientX;
    this.dragState.lastY = e.clientY;
    this.dragState.lastTime = currentTime;

    const deltaX = e.clientX - this.dragState.startX;
    const deltaY = e.clientY - this.dragState.startY;

    const newX = this.dragState.initialX + deltaX;
    const newY = this.dragState.initialY + deltaY;

    this.dragState.element.style.left = `${newX}px`;
    this.dragState.element.style.top = `${newY}px`;
  }

  private animateThrow(
    element: HTMLElement,
    velocityX: number,
    velocityY: number
  ): void {
    let currentVelocityX = velocityX;
    let currentVelocityY = velocityY;

    const animate = () => {
      currentVelocityX *= this.config.friction;
      currentVelocityY *= this.config.friction;

      const currentLeft = parseFloat(element.style.left || '0');
      const currentTop = parseFloat(element.style.top || '0');

      element.style.left = `${currentLeft + currentVelocityX}px`;
      element.style.top = `${currentTop + currentVelocityY}px`;

      if (
        Math.abs(currentVelocityX) > this.config.minVelocity ||
        Math.abs(currentVelocityY) > this.config.minVelocity
      ) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private onMouseUp(e: MouseEvent): void {
    if (!this.dragState) return;

    const { element, velocityX, velocityY } = this.dragState;

    element.style.cursor = 'grab';

    document.body.style.cursor = '';
    document.body.style.userSelect = '';

    const photosStack = document.querySelector('.photos-stack');
    const stackRect = photosStack?.getBoundingClientRect();
    const cardRect = element.getBoundingClientRect();

    if (stackRect) {
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      const stackCenterX = stackRect.left + stackRect.width / 2;
      const stackCenterY = stackRect.top + stackRect.height / 2;

      const distanceFromCenter = Math.sqrt(
        Math.pow(cardCenterX - stackCenterX, 2) +
          Math.pow(cardCenterY - stackCenterY, 2)
      );

      if (distanceFromCenter > this.config.moveThreshold) {
        const index = parseInt(element.getAttribute('data-index') || '0');
        this.config.onPhotoMoved(index);
      }
    }

    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);

    if (speed > this.config.speedThreshold) {
      this.animateThrow(element, velocityX, velocityY);
    }

    this.dragState = null;
  }

  public destroy(): void {
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }
}
