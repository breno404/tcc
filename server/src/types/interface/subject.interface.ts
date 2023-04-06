interface ISubject {
  registerObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(args?: any): void;
}
