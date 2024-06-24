import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const CountdownTimer = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      navigate('/homePage');
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return <Typography>Redirecting you in {count} seconds...</Typography>;
};

export default CountdownTimer;