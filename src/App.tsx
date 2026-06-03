import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Weather from '@/components/Weather';
import useBackgroundImage from '@/hooks/useBackgroundImage';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { imageUrl, photoLink } = useBackgroundImage(); // Fetch dynamic background

  useEffect(() => {
    // Update immediately when component mounts
    setTime(new Date());

    // Calculate milliseconds until the next minute boundary
    const calculateDelayToNextMinute = () => {
      const now = new Date();
      const secondsUntilNextMinute = 60 - now.getSeconds();
      const millisecondsUntilNextMinute =
        secondsUntilNextMinute * 1000 - now.getMilliseconds();
      return millisecondsUntilNextMinute;
    };


    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    const scheduleNextUpdate = () => {
      const delay = calculateDelayToNextMinute();
      
      // Schedule the first update to align with the next minute
      timeoutId = setTimeout(() => {
        setTime(new Date());
        
        // After the first aligned update, set up interval for every 60 seconds
        intervalId = setInterval(() => {
          setTime(new Date());
        }, 60000); // 60 seconds
      }, delay);
    };

    scheduleNextUpdate();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const dayProgress = ((time.getHours() * 60 + time.getMinutes()) / 1440) * 100;

  return (
    <div className="app" style={{ backgroundImage: `url(${imageUrl})` }}>
      <Weather />

      <div className="hero">
        <div className="date-container">
          <strong><h3>
            {time.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </h3></strong>
          <h1>
            {time.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </h1>
        </div>

        <ProgressBar progress={dayProgress} />
      </div>

      <footer className="footer">
        <p>
          <a
            title="background"
            href={photoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            /background
          </a>
        </p>
        <p>
          <a
            title="github"
            href="https://github.com/alinaqihassan/vista-fork"
            target="_blank"
            rel="noopener noreferrer"
          >
            /github
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
