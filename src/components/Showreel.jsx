
import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Film,
  Upload,
} from 'lucide-react';

import { SHOWREEL_METRICS } from '../data/portfolioData';
import { playHoverSound, playShutterSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function Showreel() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const titleRef = useRef(null);
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Performance refs to update video time and progress directly in DOM at 60fps without React re-renders
  const progressFillRef = useRef(null);
  const progressThumbRef = useRef(null);
  const topTimecodeRef = useRef(null);
  const bottomTimecodeRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState('/videos/reel.mp4');
  const [videoLabel, setVideoLabel] = useState('raees show reeel.mp4');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [videoError, setVideoError] = useState('');

  // Section entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        containerRef.current,
        { scale: 0.96, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Release temporary URLs when the component unmounts
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '00:00:00';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return [hours, minutes, secs]
      .map((value) => String(value).padStart(2, '0'))
      .join(':');
  };

  // Auto-pause video when scrolled out of view to eliminate background lag
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Play, pause and resume
  const togglePlay = useCallback(async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused || video.ended) {
        if (video.ended) {
          video.currentTime = 0;
        }

        setHasStarted(true);
        await video.play();
        playShutterSound();
      } else {
        video.pause();
        playShutterSound();
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Video playback failed:', error);
        setVideoError(
          'Unable to play the video. Please check the video file and try again.'
        );
      }
    }
  }, []);

  // Keyboard shortcut: Spacebar
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code !== 'Space') return;

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (!containerRef.current?.matches(':hover')) return;

      event.preventDefault();
      togglePlay();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay]);

  // Replay from the beginning
  const handleRestart = async (event) => {
    event.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      setHasStarted(true);
      if (progressFillRef.current) progressFillRef.current.style.width = '0%';
      if (progressThumbRef.current) progressThumbRef.current.style.left = '0%';
      if (topTimecodeRef.current) topTimecodeRef.current.textContent = 'TIMECODE: 00:00:00';
      if (bottomTimecodeRef.current) {
        bottomTimecodeRef.current.textContent = `00:00:00 / ${formatTime(video.duration || 0)}`;
      }
      await video.play();
      playShutterSound();
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Unable to replay video:', error);
      }
    }
  };

  // Mute and unmute
  const toggleAudio = (event) => {
    event.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;

    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Update the timeline at 60fps directly via DOM refs without causing React re-renders
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const curr = video.currentTime;
    const dur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
    const pct = dur > 0 ? (curr / dur) * 100 : 0;

    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pct}%`;
    }
    if (progressThumbRef.current) {
      progressThumbRef.current.style.left = `calc(${pct}% - 6px)`;
    }
    if (topTimecodeRef.current) {
      topTimecodeRef.current.textContent = `TIMECODE: ${formatTime(curr)}`;
    }
    if (bottomTimecodeRef.current) {
      bottomTimecodeRef.current.textContent = `${formatTime(curr)} / ${formatTime(dur)}`;
    }
  };

  // Get video duration
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    const dur = Number.isFinite(video.duration) ? video.duration : 0;
    setDuration(dur);
    if (bottomTimecodeRef.current) {
      bottomTimecodeRef.current.textContent = `${formatTime(video.currentTime || 0)} / ${formatTime(dur)}`;
    }
    setVideoError('');
  };

  // Seek to a selected position
  const handleSeek = (event) => {
    event.stopPropagation();

    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );

    const newTime = ratio * video.duration;
    video.currentTime = newTime;
    setHasStarted(true);

    const pct = ratio * 100;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pct}%`;
    }
    if (progressThumbRef.current) {
      progressThumbRef.current.style.left = `calc(${pct}% - 6px)`;
    }
    if (topTimecodeRef.current) {
      topTimecodeRef.current.textContent = `TIMECODE: ${formatTime(newTime)}`;
    }
    if (bottomTimecodeRef.current) {
      bottomTimecodeRef.current.textContent = `${formatTime(newTime)} / ${formatTime(video.duration)}`;
    }
  };

  // Fullscreen mode
  const handleFullScreen = async (event) => {
    event.stopPropagation();

    const container = containerRef.current;
    if (!container) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen failed:', error);
    }
  };

  // Load another video from the computer
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setVideoError('Please select a valid video file.');
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const localUrl = URL.createObjectURL(file);

    objectUrlRef.current = localUrl;

    setVideoSrc(localUrl);
    setVideoLabel(file.name);
    setIsPlaying(false);
    setHasStarted(false);
    setDuration(0);
    setVideoError('');

    if (progressFillRef.current) progressFillRef.current.style.width = '0%';
    if (progressThumbRef.current) progressThumbRef.current.style.left = '0%';
    if (topTimecodeRef.current) topTimecodeRef.current.textContent = 'TIMECODE: 00:00:00';
    if (bottomTimecodeRef.current) bottomTimecodeRef.current.textContent = '00:00:00 / 00:00:00';

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }

    event.target.value = '';
    playHoverSound();
  };

  return (
    <section
      id="showreel"
      ref={sectionRef}
      className="relative border-t border-white/[0.08] bg-black px-4 sm:px-6 md:px-12 py-10 sm:py-14 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div
          ref={titleRef}
          className="mb-6 flex flex-col justify-between border-b border-white/[0.08] pb-5 md:flex-row md:items-end"
        >
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-caribbean">
              <Film className="h-4 w-4" />
              <span>Director's Showcase // 2026</span>
            </div>

            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl">
              SHOWREEL
            </h2>

            <p className="mt-1.5 text-xs font-light uppercase tracking-wider text-beige md:text-sm">
              Highlights of Nikkah, Bridal & Groom Cinema, Automotive,
              Travel, Food & Presentations
            </p>
          </div>

          <div className="mt-4 space-y-2.5 md:mt-0">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 rounded-sm border border-white/15 bg-black px-3 py-2 font-mono text-[11px] tracking-wider text-zinc-300 transition-colors hover:bg-caribbean hover:text-black"
            >
              <Upload className="h-3 w-3" />
              LOAD / CHANGE VIDEO
            </button>

            <div className="space-y-1 font-mono text-xs text-zinc-400 md:text-right">
              <p>
                ACTIVE FILE:{' '}
                <span className="font-semibold text-caribbean">
                  {videoLabel}
                </span>
              </p>

              <p>
                FORMAT:{' '}
                <span className="text-beige">
                  {SHOWREEL_METRICS.aspect}
                </span>
              </p>

              <p>
                SPEC:{' '}
                <span className="text-white">
                  {SHOWREEL_METRICS.resolution} · {SHOWREEL_METRICS.fps}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Video player */}
        <div
          ref={containerRef}
          onClick={togglePlay}
          className="group relative aspect-video w-full cursor-pointer overflow-hidden rounded-sm border border-white/[0.12] bg-black shadow-2xl transition-all duration-500 hover:border-caribbean/60 hover:shadow-[0_0_40px_rgba(172,238,1,0.18)] md:aspect-[2.39/1]"
        >
          {/* Top cinema information */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex h-7 items-center justify-between border-b border-white/[0.05] bg-black px-4 font-mono text-[9px] text-zinc-400 md:px-6">
            <span className="hidden sm:inline">
              CINEMA ARCHIVE · MASTER TIMELINE
            </span>

            <span ref={topTimecodeRef} className="text-caribbean">
              TIMECODE: 00:00:00
            </span>
          </div>

          <video
            ref={videoRef}
            src={videoSrc}
            poster="/images/showreel_thumbnail.png"
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            onPlay={() => {
              setIsPlaying(true);
              setHasStarted(true);
              setVideoError('');
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
              if (videoSrc === '/videos/reel.mp4') {
                setVideoSrc('/videos/raees%20show%20reeel.mp4');
              } else if (videoSrc === '/videos/raees%20show%20reeel.mp4') {
                setVideoSrc('/videos/raees show reeel.mp4');
              } else {
                setIsPlaying(false);
                setVideoError(
                  'Video could not be loaded. Check that public/videos/reel.mp4 exists.'
                );
              }
            }}
            className="h-full w-full object-cover transform-gpu backface-hidden"
            style={{ willChange: 'transform' }}
          />

          {/* Film overlay */}
          <div className="pointer-events-none absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />

          {/* Play / Pause overlay */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              togglePlay();
            }}
            aria-label={isPlaying ? 'Pause showreel' : 'Play or resume showreel'}
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
              isPlaying
                ? 'pointer-events-none opacity-0 group-hover:opacity-0'
                : 'opacity-100'
            }`}
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black/80 text-caribbean shadow-2xl transition-transform duration-300 hover:scale-110 hover:border-caribbean md:h-24 md:w-24">
              {isPlaying ? (
                <Pause className="h-8 w-8 fill-current" />
              ) : (
                <Play className="ml-1 h-8 w-8 fill-current" />
              )}
            </span>

            <span className="rounded-full border border-white/10 bg-black/80 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-beige">
              {isPlaying
                ? 'PAUSE'
                : hasStarted
                  ? 'RESUME PLAYBACK'
                  : 'PLAY SHOWREEL'}
            </span>
          </button>

          {/* Bottom cinema information */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 flex h-7 items-center justify-between border-t border-white/[0.05] bg-black px-4 font-mono text-[9px] text-zinc-400 md:px-6">
            <span className="hidden sm:inline">
              2.39:1 CINEMATIC VIEW
            </span>

            <span className="flex items-center gap-2 text-beige">
              <span
                className={`h-2 w-2 rounded-full ${
                  isPlaying
                    ? 'animate-pulse bg-caribbean'
                    : 'bg-zinc-500'
                }`}
              />

              {isPlaying
                ? 'PLAYING'
                : hasStarted
                  ? 'PAUSED'
                  : 'READY'}
            </span>
          </div>


        </div>

        {/* Video error message */}
        {videoError && (
          <p
            role="alert"
            className="mt-4 rounded border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-300"
          >
            {videoError}
          </p>
        )}

      </div>
    </section>
  );
}
