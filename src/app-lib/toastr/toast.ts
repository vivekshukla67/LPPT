export class Toast {

  constructor(
    public id: number,
    public type: ToastType,
    public icon: IconType,
    public title: string,
    public message: string,
    public timeout: number,
    public position: Position
  ) { }

}

export enum ToastType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info'
}

export enum IconType {
  success = 'check_circle',
  warning = 'warning',
  error = 'error',
  info = 'info'
}
export enum Position {
  BottomRight = '',
  TopRight = '',
  CenterTop = '',
  CenterBottom = '',
  BottomLeft = '',
  TopLeft = ''
}