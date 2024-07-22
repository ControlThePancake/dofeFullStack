import React, { useEffect, useRef} from 'react';
import "../../styles.css";

// I took this from some royalty free JS background code website, its meant to be responsive but i disabled this feature due to some bugs, and to reduce load on the client and server
const StarField = () => {
  const canvasRef = useRef(null);

  const STAR_COLOR = '#fff';
  const STAR_SIZE = 3;
  const STAR_MIN_SCALE = 0.2;
  const OVERFLOW_THRESHOLD = 50;
  const scaleRef = useRef(1);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const stars = useRef([]);
  const velocity = useRef({ x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 });


  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const generate = () => {
      const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.current.push({
          x: 0,
          y: 0,
          z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE)
        });
      }
    };

    const placeStar = (star) => {
      star.x = Math.random() * widthRef.current;
      star.y = Math.random() * heightRef.current;
    };

    const recycleStar = (star) => {
      let direction = 'z';
      let vx = Math.abs(velocity.current.x), vy = Math.abs(velocity.current.y);
      if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
          axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
          axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        if (axis === 'h') {
          direction = velocity.current.x > 0 ? 'l' : 'r';
        } else {
          direction = velocity.current.y > 0 ? 't' : 'b';
        }
      }
      star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
      if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * widthRef.current;
        star.y = Math.random() * heightRef.current;
      } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === 'r') {
        star.x = widthRef.current + OVERFLOW_THRESHOLD;
        star.y = heightRef.current * Math.random();
      } else if (direction === 't') {
        star.x = widthRef.current * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
      } else if (direction === 'b') {
        star.x = widthRef.current * Math.random();
        star.y = heightRef.current + OVERFLOW_THRESHOLD;
      }
    };

    const resize = () => {
      scaleRef.current = window.devicePixelRatio || 1;
      widthRef.current = window.innerWidth * scaleRef.current;
      heightRef.current = window.innerHeight * scaleRef.current;
      canvas.width = widthRef.current;
      canvas.height = heightRef.current;
      stars.current.forEach(placeStar);
    };

    const update = () => {
      velocity.current.tx *= 0.95;
      velocity.current.ty *= 0.95;
      velocity.current.x += (velocity.current.tx - velocity.current.x) * 0.8;
      velocity.current.y += (velocity.current.ty - velocity.current.y) * 0.8;
      stars.current.forEach((star) => {
        star.x += velocity.current.x * star.z;
        star.y += velocity.current.y * star.z;
        star.x += (star.x - widthRef.current / 2) * velocity.current.z * star.z;
        star.y += (star.y - heightRef.current / 2) * velocity.current.z * star.z;
        star.z += velocity.current.z;
        if (
          star.x < -OVERFLOW_THRESHOLD ||
          star.x > widthRef.current + OVERFLOW_THRESHOLD ||
          star.y < -OVERFLOW_THRESHOLD ||
          star.y > heightRef.current + OVERFLOW_THRESHOLD
        ) {
          recycleStar(star);
        }
      });
    };

    const render = () => {
      stars.current.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scaleRef.current;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = STAR_COLOR;
        context.moveTo(star.x, star.y);
        var tailX = velocity.current.x * 2,
          tailY = velocity.current.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
      });
    };

    const step = () => {
      context.clearRect(0, 0, widthRef.current, heightRef.current);
      update();
      render();
      requestAnimationFrame(step);
    };

    

    generate();
    resize();
    step();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);

    };
  }, );

  return <canvas ref={canvasRef} className='starfield-canvas' />;
};

export default StarField;