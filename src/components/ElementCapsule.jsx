import React, { useEffect, useRef } from 'react';

export default function ElementCapsule({ element }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const width = canvas.width = 160;
    const height = canvas.height = 200;

    // Simulation variables
    let frame = 0;

    // Particle pool for gas/vortex and solid/crystals
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: width / 2,
        y: Math.random() * (height - 60) + 30,
        radius: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.05 + 0.02,
        radiusY: Math.random() * 30 + 10,
        verticalSpeed: Math.random() * 0.8 + 0.3,
        color: 'rgba(255, 255, 255, 0.8)'
      });
    }

    // Plasma/electric arcs for noble gases
    const arcs = [];
    const createArcPoints = () => {
      const pts = [];
      const steps = 10;
      pts.push({ x: width / 2, y: 30 });
      for (let i = 1; i < steps; i++) {
        const progress = i / steps;
        const targetY = 30 + progress * (height - 60);
        pts.push({
          x: width / 2 + (Math.random() - 0.5) * 20,
          y: targetY
        });
      }
      pts.push({ x: width / 2, y: height - 30 });
      return pts;
    };

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glass background cylinder
      const bgGrad = ctx.createLinearGradient(0, 0, width, 0);
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      bgGrad.addColorStop(0.3, 'rgba(30, 41, 59, 0.6)');
      bgGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.5)');
      bgGrad.addColorStop(0.7, 'rgba(30, 41, 59, 0.6)');
      bgGrad.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(20, 20, width - 40, height - 40);

      // Determine element type/state and draw effect
      const stateType = element?.state || 'gas';
      const category = element?.category || '';

      if (stateType === 'gas') {
        if (category.includes('noble')) {
          // --- NOBLE GAS: Pulsing Plasma Arcs ---
          ctx.shadowBlur = 15;
          
          // Determine color based on noble gas
          let plasmaColor = '#ec4899'; // default pink/helium
          if (element?.symbol === 'Ne') plasmaColor = '#f97316'; // Neon Orange
          if (element?.symbol === 'Ar') plasmaColor = '#a855f7'; // Argon Violet
          if (element?.symbol === 'Xe') plasmaColor = '#3b82f6'; // Xenon Blue

          ctx.shadowColor = plasmaColor;
          ctx.strokeStyle = plasmaColor;
          ctx.lineWidth = 2.5;

          // Render 2 electric arcs
          if (frame % 8 === 0 || arcs.length === 0) {
            arcs[0] = createArcPoints();
            arcs[1] = createArcPoints();
          }

          arcs.forEach(arc => {
            if (!arc) return;
            ctx.beginPath();
            ctx.moveTo(arc[0].x, arc[0].y);
            for (let i = 1; i < arc.length; i++) {
              ctx.lineTo(arc[i].x, arc[i].y);
            }
            ctx.stroke();
          });

          // Core glowing pillar
          const coreGrad = ctx.createLinearGradient(0, 0, width, 0);
          coreGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
          coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
          coreGrad.addColorStop(0.6, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = coreGrad;
          ctx.fillRect(width / 2 - 6, 30, 12, height - 60);

        } else {
          // --- REGULAR GAS (e.g., Hydrogen, Nitrogen): Swirling Vortex ---
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#e2e8f0';

          particles.forEach(p => {
            // Update particle
            p.angle += p.speed;
            p.y -= p.verticalSpeed;

            // Loop vertical coordinates
            if (p.y < 30) {
              p.y = height - 35;
              p.radiusY = Math.random() * 28 + 8;
            }

            // Orbital mathematics (vortex shape gets narrower at bottom, wider at top)
            const heightFactor = (p.y - 30) / (height - 60); // 0 at top, 1 at bottom
            const currentRadiusX = (1 - heightFactor) * 28 + 4; // Wider at top

            p.x = width / 2 + Math.cos(p.angle) * currentRadiusX;

            // Draw particle
            const opacity = (1 - heightFactor) * 0.7 + 0.1;
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
          });
        }

      } else if (stateType === 'liquid') {
        // --- LIQUID (e.g., Mercury, Bromine): Flowing Wave ---
        // Color based on Bromine (brownish red) or Mercury (silvery grey)
        const isMercury = element?.symbol === 'Hg' || element?.symbol === 'Ag';
        const liquidColor = isMercury ? '#94a3b8' : '#b91c1c';
        const liquidColorGlow = isMercury ? '#cbd5e1' : '#ef4444';

        ctx.shadowBlur = 10;
        ctx.shadowColor = liquidColorGlow;

        // Wave rendering
        ctx.fillStyle = liquidColor;
        ctx.beginPath();
        ctx.moveTo(22, height - 30);
        
        // Sine wave calculations
        const waveHeight = 8;
        const fillLevel = height - 85; // liquid height

        ctx.lineTo(22, fillLevel);
        for (let x = 22; x <= width - 22; x++) {
          const y = fillLevel + Math.sin((x / 15) + (frame * 0.08)) * waveHeight;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width - 22, height - 30);
        ctx.closePath();
        ctx.fill();

        // Shimmer gradient over liquid
        const liquidGlint = ctx.createLinearGradient(0, fillLevel - 5, 0, height - 30);
        liquidGlint.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        liquidGlint.addColorStop(0.1, 'rgba(255, 255, 255, 0.1)');
        liquidGlint.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        ctx.fillStyle = liquidGlint;
        ctx.fillRect(22, fillLevel - 5, width - 44, height - 30 - fillLevel + 5);

        // Draw bubbles floating up
        particles.slice(0, 15).forEach(p => {
          p.y -= p.verticalSpeed * 0.8;
          p.x += Math.sin(frame * 0.05 + p.angle) * 0.5;

          if (p.y < fillLevel) {
            p.y = height - 40;
            p.x = Math.random() * (width - 60) + 30;
          }

          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (stateType === 'solid') {
        // --- SOLID (e.g., Gold, Carbon, Iron): Spinning Crystals ---
        let crystalColor = '#eab308'; // Default gold
        if (element?.symbol === 'Fe') crystalColor = '#64748b'; // Iron grey
        if (element?.symbol === 'C') crystalColor = '#334155'; // Graphite black
        if (element?.symbol === 'Li') crystalColor = '#a8a29e'; // Lithium silvery stone

        ctx.shadowBlur = 12;
        ctx.shadowColor = crystalColor;

        // Draw floating crystals
        const numCrystals = 3;
        for (let j = 0; j < numCrystals; j++) {
          const speedFactor = (j + 1) * 0.015;
          const yOffset = Math.sin(frame * speedFactor + j) * 8;
          const cx = width / 2 + Math.cos(frame * 0.02 + j * 2) * 15;
          const cy = height / 2 + yOffset - 10 + (j - 1) * 30;
          const size = 12 + j * 3;

          // Draw double-pyramid crystal
          ctx.fillStyle = crystalColor;
          ctx.beginPath();
          ctx.moveTo(cx, cy - size); // top tip
          ctx.lineTo(cx + size * 0.7, cy); // right point
          ctx.lineTo(cx, cy + size); // bottom tip
          ctx.lineTo(cx - size * 0.7, cy); // left point
          ctx.closePath();
          ctx.fill();

          // Highlight side
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.beginPath();
          ctx.moveTo(cx, cy - size);
          ctx.lineTo(cx + size * 0.7, cy);
          ctx.lineTo(cx, cy);
          ctx.closePath();
          ctx.fill();
        }

        // Floating sparkles
        particles.slice(0, 20).forEach(p => {
          p.y -= p.verticalSpeed * 0.4;
          if (p.y < 35) {
            p.y = height - 40;
            p.x = Math.random() * (width - 60) + 30;
          }

          ctx.fillStyle = 'rgba(234, 179, 8, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.shadowBlur = 0; // Reset shadow

      // 2. Draw front glass highlight (reflection)
      const glossGrad = ctx.createLinearGradient(0, 0, width, 0);
      glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glossGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.15)');
      glossGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.25)');
      glossGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.05)');
      glossGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0)');
      glossGrad.addColorStop(0.9, 'rgba(255, 255, 255, 0.15)');
      glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGrad;
      ctx.fillRect(20, 20, width - 40, height - 40);

      // Inner glass tube lining
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(22, 20, width - 44, height - 40);

      // 3. Draw Top and Bottom Metal Caps (Brass and Gold)
      const capGrad = ctx.createLinearGradient(0, 0, width, 0);
      capGrad.addColorStop(0, '#78350f'); // Brown-900 (brass base)
      capGrad.addColorStop(0.3, '#ca8a04'); // Yellow-600
      capGrad.addColorStop(0.5, '#fef08a'); // Yellow-200 (glint)
      capGrad.addColorStop(0.7, '#ca8a04');
      capGrad.addColorStop(1, '#78350f');

      // Top Cap
      ctx.fillStyle = capGrad;
      ctx.fillRect(10, 5, width - 20, 15);
      // Top base
      ctx.fillRect(5, 0, width - 10, 6);
      
      // Bottom Cap
      ctx.fillRect(10, height - 20, width - 20, 15);
      // Bottom base
      ctx.fillRect(5, height - 6, width - 10, 6);

      // Gold bolts on caps
      ctx.fillStyle = '#fef08a';
      // Top bolts
      ctx.beginPath(); ctx.arc(25, 12, 3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(width - 25, 12, 3, 0, Math.PI*2); ctx.fill();
      // Bottom bolts
      ctx.beginPath(); ctx.arc(25, height - 12, 3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(width - 25, height - 12, 3, 0, Math.PI*2); ctx.fill();

      // Horizontal metallic lines
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 15); ctx.lineTo(width - 10, 15);
      ctx.moveTo(10, height - 15); ctx.lineTo(width - 10, height - 15);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [element]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Glow highlight surrounding the capsule */}
      <div className="absolute inset-0 bg-teal-500/10 blur-xl rounded-full pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="border border-teal-500/20 rounded-lg bg-[#080d1a]"
      />
    </div>
  );
}
