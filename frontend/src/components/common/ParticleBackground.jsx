import React, { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const { user } = useAuth();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let mouse = {
      x: null,
      y: null,
      radius: 120,
    };

    /* =========================
       CANVAS SIZE
    ========================== */

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    /* =========================
       PREMIUM COLORS
    ========================== */

    const colors = [
      "rgba(168,85,247,0.9)", // purple
      "rgba(34,211,238,0.9)", // cyan
      "rgba(236,72,153,0.9)", // pink
      "rgba(99,102,241,0.9)", // indigo
    ];

    /* =========================
       PARTICLE COUNT
    ========================== */

    const particleCount = user ? 90 : 65;

    /* =========================
       PARTICLE CLASS
    ========================== */

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2.8 + 1;

        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;

        this.color = colors[Math.floor(Math.random() * colors.length)];

        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        /* =========================
           SCREEN BOUNDS
        ========================== */

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        /* =========================
           MOUSE INTERACTION
        ========================== */

        if (mouse.x && mouse.y) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            this.x += dx * 0.008;
            this.y += dy * 0.008;
          }
        }
      }

      draw() {
        ctx.save();

        ctx.beginPath();

        ctx.fillStyle = this.color;

        /* Glow */
        ctx.shadowBlur = 18;
        ctx.shadowColor = this.color;

        ctx.globalAlpha = this.opacity;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.restore();
      }
    }

    /* =========================
       CREATE PARTICLES
    ========================== */

    const initParticles = () => {
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    /* =========================
       CONNECTION LINES
    ========================== */

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;

          const dy = particles[a].y - particles[b].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();

            ctx.strokeStyle = `rgba(255,255,255,${0.08 - distance / 1400})`;

            ctx.lineWidth = 1;

            ctx.moveTo(particles[a].x, particles[a].y);

            ctx.lineTo(particles[b].x, particles[b].y);

            ctx.stroke();
          }
        }
      }
    };

    /* =========================
       BACKGROUND GRADIENT
    ========================== */

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      gradient.addColorStop(0, "#030712");
      gradient.addColorStop(0.5, "#0B1120");
      gradient.addColorStop(1, "#111827");

      ctx.fillStyle = gradient;

      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    /* =========================
       ANIMATION LOOP
    ========================== */

    const animate = () => {
      drawBackground();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    /* =========================
       EVENTS
    ========================== */

    const handleResize = () => {
      setCanvasSize();
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("resize", handleResize);

    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseout", handleMouseLeave);

    /* =========================
       CLEANUP
    ========================== */

    return () => {
      cancelAnimationFrame(animationRef.current);

      window.removeEventListener("resize", handleResize);

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [user]);

  return (
    <>
      {/* Main Canvas */}
      <canvas
        ref={canvasRef}
        className="
          fixed
          top-0
          left-0
          w-full
          h-full
          -z-50
        "
      />

      {/* Extra Gradient Overlay */}
      <div
        className="
          fixed
          inset-0
          -z-40
          pointer-events-none
          bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_30%)]
        "
      />
    </>
  );
};

export default ParticleBackground;
