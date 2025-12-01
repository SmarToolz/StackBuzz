import React, { useState, useEffect } from "react";
import { differenceInSeconds, endOfDay, startOfTomorrow } from "date-fns";

interface CountdownTimerProps {
  targetDate?: Date;
  dailyReset?: boolean;
}

const calculateTimeLeft = (targetDate?: Date, dailyReset?: boolean) => {
  const now = new Date();
  let effectiveTargetDate: Date | undefined;

  if (dailyReset) {
    // Calculate time until the end of today (midnight tonight)
    effectiveTargetDate = endOfDay(now);
    
    // If it's already past midnight (e.g., 00:01), set target to end of tomorrow
    if (differenceInSeconds(effectiveTargetDate, now) <= 0) {
        effectiveTargetDate = endOfDay(startOfTomorrow());
    }
  } else if (targetDate) {
    effectiveTargetDate = targetDate;
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const totalSeconds = differenceInSeconds(effectiveTargetDate, now);

  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds, expired: false };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, dailyReset = false }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate, dailyReset));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate, dailyReset));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, dailyReset]);

  const { days, hours, minutes, seconds, expired } = timeLeft;

  if (expired && !dailyReset) {
    return <span className="text-2xl font-semibold text-brand-primary">We are live!</span>;
  }
  
  // If dailyReset is true, we always show the countdown (it resets daily).
  // If expired is true and dailyReset is false, we show "We are live!".

  const TimeSegment: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center p-3 bg-gray-800 rounded-lg shadow-md min-w-[60px] sm:min-w-[80px]">
      <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase text-gray-400 mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-center space-x-3 sm:space-x-4">
      {/* Only show days if it's a long-term timer or if days > 0 */}
      {(days > 0 || !dailyReset) && <TimeSegment value={days} label="Days" />}
      <TimeSegment value={hours} label="Hours" />
      <TimeSegment value={minutes} label="Minutes" />
      <TimeSegment value={seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;