import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [cursorActive, setCursorActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on non-touch pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId;
    const animate = () => {
      // Smooth lerp for outer ring
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    // Efficient event delegation for interactive elements (no MutationObserver, zero memory leaks)
    const handleMouseOver = (e) => {
      const target = e.target.closest?.('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorActive(true);
      } else {
        setCursorText('');
        setCursorActive(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Center pinpoint */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-caribbean rounded-full pointer-events-none z-[9999] transition-opacity duration-300 mix-blend-difference shadow-[0_0_8px_#acee01] ${
          isVisible && !cursorActive ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Cinematic Focus Outer Ring / Interactive Badge */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 ease-out flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorActive
            ? 'w-20 h-20 -ml-10 -mt-10 bg-black/90 backdrop-blur-md border border-caribbean text-caribbean font-mono text-[10px] tracking-widest uppercase rounded-full shadow-2xl scale-100 shadow-[0_0_20px_rgba(172,238,1,0.35)]'
            : 'w-8 h-8 -ml-4 -mt-4 border border-white/30 rounded-full scale-100'
        }`}
      >
        {cursorActive && (
          <span className="font-mono font-semibold tracking-widest text-[10px] animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}
