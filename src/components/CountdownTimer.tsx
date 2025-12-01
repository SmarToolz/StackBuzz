import React, { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

interface CountdownTimerProps {
  targetDate: Date;
}

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  // Calculate difference in seconds. date-fns handles time zones correctly when comparing Date objects.
  const totalSeconds = differenceInSeconds(targetDate, now);

  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return { days, hours, minutes, seconds, expired: false };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { days, hours, minutes, seconds, expired } = timeLeft;

  if (expired) {
    return <span className="text-2xl font-semibold text-brand-primary">We are live!</span>;
  }

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
      <TimeSegment value={days} label="Days" />
      <TimeSegment value={hours} label="Hours" />
      <TimeSegment value={minutes} label="Minutes" />
      <TimeSegment value={seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimer;