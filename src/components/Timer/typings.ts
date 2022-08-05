export interface TimerProps {
  countdownTimeInSeconds: number;
  onComplete?: CallableFunction;
  setIsTimerComplete?: CallableFunction;
}
