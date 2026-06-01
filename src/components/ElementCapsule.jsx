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

    // Particle pool for gas/vapor and liquid bubbles
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: width / 2,
        y: Math.random() * (height - 60) + 30,
        radius: Math.random() * 3 + 1.5,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.04 + 0.015,
        radiusY: Math.random() * 30 + 10,
        verticalSpeed: Math.random() * 0.7 + 0.3,
        color: 'rgba(236, 72, 153, 0.4)'
      });
    }

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
      const isMetal = category.includes('metal') || category.includes('lanthanide') || category.includes('actinide');

      if (stateType === 'gas') {
        // --- 1. GASES: Swirling glowing neon-pink vapor ---
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ec4899'; // Neon pink glow

        particles.forEach(p => {
          // Orbit and rise
          p.angle += p.speed;
          p.y -= p.verticalSpeed * 0.7;

          // Recycle particles at bottom
          if (p.y < 30) {
            p.y = height - 35;
            p.radiusY = Math.random() * 28 + 8;
          }

          // Vortex shape: wider at top, narrower at bottom
          const heightFactor = (p.y - 30) / (height - 60); // 0 at top, 1 at bottom
          const currentRadiusX = (1 - heightFactor) * 28 + 4;

          p.x = width / 2 + Math.cos(p.angle) * currentRadiusX;

          // Draw volumetric glowing vapor puff
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
          const opacity = (1 - heightFactor) * 0.35 + 0.05;
          grad.addColorStop(0, `rgba(236, 72, 153, ${opacity})`);
          grad.addColorStop(0.5, `rgba(236, 72, 153, ${opacity * 0.4})`);
          grad.addColorStop(1, 'rgba(236, 72, 153, 0)');
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
          ctx.fill();
        });

      } else if (stateType === 'liquid') {
        // --- 2. LIQUIDS: Pulsating, bubbling fluid sloshing ---
        const isHg = element?.symbol === 'Hg';
        const isBr = element?.symbol === 'Br';
        
        // Colors: Mercury = silver, Bromine = dark red, others = glowing cyan
        let fillStyle = '#0891b2'; // Cyan-600
        let glowColor = '#06b6d4'; // Cyan-500
        if (isHg) {
          fillStyle = '#475569'; // Slate-600
          glowColor = '#cbd5e1'; 
        } else if (isBr) {
          fillStyle = '#991b1b'; // Red-800
          glowColor = '#ef4444';
        }

        ctx.shadowBlur = 12;
        ctx.shadowColor = glowColor;

        // Sloshing wave calculations
        const waveHeight = 6 + Math.sin(frame * 0.06) * 3; // Pulsating wave amp
        const fillLevel = (height - 80) + Math.sin(frame * 0.025) * 4; // Pulsating height

        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.moveTo(22, height - 30);
        ctx.lineTo(22, fillLevel);
        
        for (let x = 22; x <= width - 22; x++) {
          const y = fillLevel + Math.sin((x / 14) + (frame * 0.07)) * waveHeight;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width - 22, height - 30);
        ctx.closePath();
        ctx.fill();

        // Wave crest highlight line
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Shimmer gradient overlay
        const liquidGlint = ctx.createLinearGradient(0, fillLevel - 5, 0, height - 30);
        liquidGlint.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        liquidGlint.addColorStop(0.1, 'rgba(255, 255, 255, 0.1)');
        liquidGlint.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
        ctx.fillStyle = liquidGlint;
        ctx.fillRect(22, fillLevel - 5, width - 44, height - 30 - fillLevel + 5);

        // Rising bubbles in liquid
        particles.slice(0, 20).forEach(p => {
          p.y -= p.verticalSpeed * 0.6;
          p.x += Math.sin(frame * 0.04 + p.angle) * 0.6;

          // Recycle bubble if it floats above fluid level
          if (p.y < fillLevel) {
            p.y = height - 35;
            p.x = Math.random() * (width - 60) + 30;
          }

          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fill();
        });

      } else {
        // --- 3. SOLIDS: Jagged, rotating metallic/non-metallic crystals ---
        const scale = 26;
        const cx = width / 2;
        const cy = height / 2 - 10;

        // 3D Octahedron vertices
        const vertices = [
          { x: 0, y: -scale * 1.3, z: 0 },
          { x: scale, y: 0, z: 0 },
          { x: 0, y: 0, z: scale },
          { x: -scale, y: 0, z: 0 },
          { x: 0, y: 0, z: -scale },
          { x: 0, y: scale * 1.3, z: 0 }
        ];

        // 3D rotation angles
        const rotY = frame * 0.022;
        const rotX = frame * 0.012;

        const projected = vertices.map(v => {
          // Y rotation
          let x1 = v.x * Math.cos(rotY) - v.z * Math.sin(rotY);
          let z1 = v.x * Math.sin(rotY) + v.z * Math.cos(rotY);
          // X rotation
          let y2 = v.y * Math.cos(rotX) - z1 * Math.sin(rotX);
          let z2 = v.y * Math.sin(rotX) + z1 * Math.cos(rotX);
          
          // Project to 2D
          const zoom = 190;
          const dist = 200;
          const depth = (dist - z2);
          const px = cx + (x1 * zoom) / depth;
          const py = cy + (y2 * zoom) / depth;
          return { x: px, y: py, z: z2 };
        });

        // 8 triangular faces
        const faces = [
          [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1], // Top
          [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]  // Bottom
        ];

        // Sort faces by depth (back to front)
        const facesWithDepth = faces.map(face => {
          const avgZ = (projected[face[0]].z + projected[face[1]].z + projected[face[2]].z) / 3;
          return { face, avgZ };
        });
        facesWithDepth.sort((a, b) => b.avgZ - a.avgZ);

        // Define metal tones
        let glowColor = '#eab308'; // Default gold
        let stop1 = '#cbd5e1', stop2 = '#94a3b8', stop3 = '#475569'; // Silver

        if (isMetal) {
          const isGoldOrAlkali = category.includes('alkali') || element?.symbol === 'Au';
          const isCopper = element?.symbol === 'Cu';
          
          if (isGoldOrAlkali) {
            glowColor = '#f59e0b';
            stop1 = '#fef08a'; stop2 = '#eab308'; stop3 = '#854d0e';
          } else if (isCopper) {
            glowColor = '#ea580c';
            stop1 = '#ffedd5'; stop2 = '#ea580c'; stop3 = '#7c2d12';
          } else {
            glowColor = '#a8a29e';
            stop1 = '#ffffff'; stop2 = '#94a3b8'; stop3 = '#334155';
          }
        } else {
          // Non-metals (Carbon, Sulfur, etc.) -> Charcoal crystals
          glowColor = '#6b7280';
          if (element?.symbol === 'S') {
            glowColor = '#eab308';
            stop1 = '#fef08a'; stop2 = '#facc15'; stop3 = '#854d0e'; // Yellow sulfur
          } else {
            stop1 = '#475569'; stop2 = '#1e293b'; stop3 = '#0f172a'; // Black/grey carbon
          }
        }

        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor;

        facesWithDepth.forEach(({ face }) => {
          const p0 = projected[face[0]];
          const p1 = projected[face[1]];
          const p2 = projected[face[2]];

          // Cross product backface culling
          const cross = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
          if (cross < 0) return;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.closePath();

          // Shiny metallic gradient shifting over time
          const metalGrad = ctx.createLinearGradient(p0.x, p0.y, p2.x, p2.y);
          const shift = (Math.sin(frame * 0.04) + 1) / 2 * 0.25;

          metalGrad.addColorStop(0, stop1);
          metalGrad.addColorStop(0.3 + shift, stop2);
          metalGrad.addColorStop(1, stop3);

          ctx.fillStyle = metalGrad;
          ctx.fill();

          // Sharp crystal outlines
          ctx.strokeStyle = isMetal ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Floating ambient sparkles around the crystal
        particles.slice(0, 15).forEach(p => {
          p.y -= p.verticalSpeed * 0.35;
          if (p.y < 35) {
            p.y = height - 40;
            p.x = Math.random() * (width - 60) + 30;
          }

          ctx.fillStyle = isMetal ? 'rgba(255, 255, 255, 0.65)' : 'rgba(234, 179, 8, 0.45)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      ctx.shadowBlur = 0; // Reset shadow

      // 2. Draw front glass highlight (reflection)
      const glossGrad = ctx.createLinearGradient(0, 0, width, 0);
      glossGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      glossGrad.addColorStop(0.15, 'rgba(255, 255, 255, 0.18)');
      glossGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.28)');
      glossGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.06)');
      glossGrad.addColorStop(0.85, 'rgba(255, 255, 255, 0)');
      glossGrad.addColorStop(0.9, 'rgba(255, 255, 255, 0.12)');
      glossGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glossGrad;
      ctx.fillRect(20, 20, width - 40, height - 40);

      // Inner glass tube lining
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
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
      <div className="absolute inset-0 bg-teal-500/5 blur-xl pointer-events-none" />
      <canvas
        ref={canvasRef}
        className="border border-teal-500/20 rounded-none bg-[#05050a]"
      />
    </div>
  );
}
