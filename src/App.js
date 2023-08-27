import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [value, setValue] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let spots = [];
    let hue = 0;

    const mouse = {
      x: undefined,
      y: undefined,
    };

    canvas.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      for (let i = 0; i < 3; i++) {
        spots.push(new Particle(mouse.x, mouse.y));
      }
    });

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.03;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function handleParticle() {
      for (let i = 0; i < spots.length; i++) {
        spots[i].update();
        spots[i].draw();
        for (let j = i; j < spots.length; j++) {
          const dx = spots[i].x - spots[j].x;
          const dy = spots[i].y - spots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 90) {
            ctx.beginPath();
            ctx.strokeStyle = spots[i].color;
            ctx.lineWidth = spots[i].size / 10;
            ctx.moveTo(spots[i].x, spots[i].y);
            ctx.lineTo(spots[j].x, spots[j].y);
            ctx.stroke();
          }
        }
        if (spots[i].size <= 0.3) {
          spots.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticle();
      hue++;
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <h1 className="text-center heading">CALCULATOR</h1>
      <div className="container">
        <div className="row">
          <input className="input" type="text" value={value} />
        </div>
        <div className='buttons'>
          <div className="row">
            <button className="button orange" value="C" onClick={(e) => setValue('')}>C</button>
            <button className="button" value="7" onClick={(e) => setValue(value + e.target.value)}>7</button>
            <button className="button" value="4" onClick={(e) => setValue(value + e.target.value)}>4</button>
            <button className="button" value="1" onClick={(e) => setValue(value + e.target.value)}>1</button>
            <button className="button" value="00" onClick={(e) => setValue(value + e.target.value)}>00</button>
          </div>
          <div className="row">
            <button className="button orange" value="Del" onClick={(e) => setValue(value.slice(0, -1))}>Del</button>
            <button className="button" value="8" onClick={(e) => setValue(value + e.target.value)}>8</button>
            <button className="button" value="5" onClick={(e) => setValue(value + e.target.value)}>5</button>
            <button className="button" value="2" onClick={(e) => setValue(value + e.target.value)}>2</button>
            <button className="button" value="0" onClick={(e) => setValue(value + e.target.value)}>0</button>
          </div>
          <div className="row">
            <button className="button orange" value="Ans" onClick={(e) => setValue(eval(value))}>Ans</button>
            <button className="button" value="9" onClick={(e) => setValue(value + e.target.value)}>9</button>
            <button className="button" value="6" onClick={(e) => setValue(value + e.target.value)}>6</button>
            <button className="button" value="3" onClick={(e) => setValue(value + e.target.value)}>3</button>
            <button className="button" value="." onClick={(e) => setValue(value + e.target.value)}>.</button>
          </div>
          <div className="row">
            <button className="button orange" value="/" onClick={(e) => setValue(value + e.target.value)}>/</button>
            <button className="button orange" value="*" onClick={(e) => setValue(value + e.target.value)}>*</button>
            <button className="button orange" value="+" onClick={(e) => setValue(value + e.target.value)}>+</button>
            <button className="button orange" value="-" onClick={(e) => setValue(value + e.target.value)}>-</button>
            <button className="button orange" value="=" onClick={(e) => setValue(eval(value))}>=</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;