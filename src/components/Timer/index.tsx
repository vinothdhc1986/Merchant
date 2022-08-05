import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setIsTimerComplete } from '../../redux/actions/login';
import { TimerProps } from './typings';
import { timerDisplay } from '../../lib/helper';

const Timer: FC<TimerProps> = (props): JSX.Element => {
  const { countdownTimeInSeconds } = props;
  const [remainingSeconds, setRemainingSeconds] = useState(
    countdownTimeInSeconds
  );

  useEffect(() => {
    let intervalSeconds = countdownTimeInSeconds;
    const myInterval = setInterval(() => {
      if (intervalSeconds > 0) {
        intervalSeconds = intervalSeconds - 1;
        setRemainingSeconds(intervalSeconds);
      } else {
        props.setIsTimerComplete && props.setIsTimerComplete(true);
        props.onComplete && props.onComplete();
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [props.countdownTimeInSeconds]);

  return <span>{timerDisplay(remainingSeconds)}</span>;
};

export default connect(null, { setIsTimerComplete })(Timer);
