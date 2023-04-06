interface IObserver {
  observerType: string;
  update(arg?: any): void;
}
