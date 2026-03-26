import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Easing, Audio, staticFile, spring, useVideoConfig } from 'remotion';

// ========== SMOOTH EASING CURVES ==========
const smoothEase = Easing.bezier(0.4, 0, 0.2, 1);
const smoothIn = Easing.bezier(0.4, 0, 1, 1);
const smoothOut = Easing.bezier(0, 0, 0.2, 1);

// ========== THEME (SAL GREEN) ==========
const theme = {
  colors: {
    // Primary fresh green
    amber: '#2DB668',
    amberLight: '#7BE8A4',
    peach: '#3CC77A',
    peachLight: '#D4F5E2',
    peachBg: '#E8FAF0',
    cream: '#F2FBF6',
    white: '#FFFFFF',

    // Accents
    blue: '#4A7DFF',
    blueLight: '#EBF0FF',
    blueBorder: '#7BA3FF',
    green: '#22C55E',
    greenLight: '#DCFCE7',
    greenBorder: '#4ADE80',
    yellow: '#F59E0B',
    yellowLight: '#FEF3C7',
    yellowBorder: '#FBBF24',
    pink: '#EC4899',
    pinkLight: '#FCE7F3',
    pinkBorder: '#F472B6',
    purple: '#8B5CF6',
    purpleLight: '#EDE9FE',
    red: '#EF4444',

    // UI
    gray: '#6B7280',
    grayLight: '#F3F4F6',
    textDark: '#1F2937',
  },
};

// ========== SCENE 1+2: SAL Logo Intro → meetsal.ai Reveal (merged) ==========
const Scene1_LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0-20): SAL fades in and scales up
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Font size: scales up, holds, then shrinks into icon
  const salFontSize = interpolate(frame, [0, 18, 40, 58], [120, 140, 140, 48], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Grid: fades in (0-20), then fades out (20-35)
  const gridOpacity = interpolate(frame, [3, 18, 40], [0, 0.5, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Background: green gradient → cream (starts at frame 20)
  const bgTransition = interpolate(frame, [42, 52], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Text shadow fades out as it shrinks
  const shadowOpacity = interpolate(frame, [38, 48], [0.25, 0], {
    extrapolateRight: 'clamp',
  });

  // Icon box appears behind SAL as it shrinks
  const iconBoxOpacity = interpolate(frame, [42, 52], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const iconBoxScale = interpolate(frame, [42, 52], [0.5, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // meetsal.ai reveals simultaneously with SAL sliding left
  const textReveal = interpolate(frame, [32, 48], [0, 100], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [42, 48], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // After slide done (65), longer gentle ease-in building to the drop
  const breatheScale = interpolate(frame, [15, 97], [1, 1.65], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Bass drop hit at frame 97 (3.23s) — punch out: scale burst + fade
  const dropScale = interpolate(frame, [97, 102], [1, 1.8], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const dropOpacity = interpolate(frame, [97, 102], [1, 0], {
    easing: Easing.bezier(0.4, 0, 1, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // "AL" collapses: width shrinks from actual pixel width to 0
  const alWidth = interpolate(frame, [42, 60], [300, 0], {
    easing: smoothEase,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const alOpacity = interpolate(frame, [42, 55], [1, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Green bg: fullscreen overlay shrinks to 0 opacity, icon box grows
  const greenBgOpacity = interpolate(frame, [42, 60], [1, 0], {
    easing: smoothEase,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // meetsal.ai mask reveal after AL is gone
  const meetWidth = interpolate(frame, [80, 97], [0, 420], {
    easing: Easing.bezier(0.25, 0, 0.4, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const meetOpacity = interpolate(frame, [80, 90], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Gap between S icon and meetsal.ai grows smoothly
  const meetGap = interpolate(frame, [78, 90], [0, 16], {
    easing: Easing.bezier(0.25, 0, 0.4, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      {/* Green fullscreen bg — fades out as it "shrinks" to icon */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(145deg, ${theme.colors.peachLight} 0%, ${theme.colors.peach} 50%, ${theme.colors.amber} 100%)`,
        opacity: greenBgOpacity,
      }} />

      {/* Crosshair grid lines */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: gridOpacity, zIndex: 1 }}>
        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="67%" x2="100%" y2="67%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
      </svg>

      {/* Content — one continuous flex row, always centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(calc(-50% + 25px), -50%) scale(${breatheScale}) scale(${dropScale})`,
        opacity: logoOpacity * dropOpacity,
        display: 'flex',
        alignItems: 'center',
        zIndex: 2,
      }}>
        {/* SAL text — one element, AL clips away via container width */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Green icon box — behind S */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: `translateY(-50%) scale(${iconBoxScale})`,
            width: 110,
            height: 85,
            background: `linear-gradient(145deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
            borderRadius: 18,
            opacity: iconBoxOpacity,
            boxShadow: '0 6px 20px rgba(45, 182, 104, 0.3)',
          }} />

          {/* SAL as one word — container width clips AL away */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: frame < 42 ? undefined : interpolate(frame, [42, 52], [400, 110], {
              easing: smoothEase,
              extrapolateRight: 'clamp',
            }),
            height: frame < 42 ? undefined : interpolate(frame, [42, 52], [170, 85], {
              easing: smoothEase,
              extrapolateRight: 'clamp',
            }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: 'white',
              fontSize: salFontSize,
              textShadow: `4px 4px 12px rgba(0,0,0,${shadowOpacity})`,
              letterSpacing: 4,
            }}>{frame < 48 ? 'SAL' : 'S'}</div>
          </div>
        </div>

        {/* meetsal.ai — mask reveals after S settles */}
        <div style={{
          overflow: 'hidden',
          width: meetWidth,
          marginLeft: meetGap,
        }}>
          <span style={{
            fontSize: 64,
            fontFamily: 'Georgia, serif',
            color: theme.colors.amber,
            whiteSpace: 'nowrap',
            opacity: meetOpacity,
          }}>meetsal.ai</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 3: Pain Point ==========
const Scene3_PainPoint: React.FC = () => {
  const frame = useCurrentFrame();

  // Punch in
  const sceneInOpacity = interpolate(frame, [0, 8], [0, 1], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
  });
  const sceneInScale = interpolate(frame, [0, 8], [1.3, 1], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
  });

  // Staggered reveal — starts after punch-in settles
  const word1Opacity = interpolate(frame, [10, 18], [0, 1], { extrapolateRight: 'clamp' });
  const word1Y = interpolate(frame, [10, 18], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

  const word2Opacity = interpolate(frame, [22, 30], [0, 1], { extrapolateRight: 'clamp' });
  const word2Y = interpolate(frame, [22, 30], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

  const word3Opacity = interpolate(frame, [34, 42], [0, 1], { extrapolateRight: 'clamp' });
  const word3Y = interpolate(frame, [34, 42], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

  // Green SVG cursor
  const cursorOpacity = interpolate(frame, [10, 15], [0, 1], { extrapolateRight: 'clamp' });
  const cursorX = interpolate(frame, [10, 50], [1200, 980], {
    easing: smoothEase,
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [10, 50], [700, 530], {
    easing: smoothEase,
    extrapolateRight: 'clamp',
  });

  // Pill click squish at frame 58
  const pillScale = interpolate(frame, [56, 58, 60, 62], [1, 0.92, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Burst out after click
  const sceneOutOpacity = interpolate(frame, [62, 68], [1, 0], {
    easing: smoothIn,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const sceneOutScale = interpolate(frame, [62, 68], [1, 1.3], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      <AbsoluteFill style={{
        opacity: sceneInOpacity * sceneOutOpacity,
        transform: `scale(${sceneInScale * sceneOutScale})`,
      }}>
        {/* Subtle glowing circle behind text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1400,
          height: 1400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.amber}55 0%, ${theme.colors.amberLight}30 50%, transparent 70%)`,
          opacity: word1Opacity,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            fontSize: 48,
            fontFamily: 'Georgia, serif',
            color: theme.colors.textDark,
            opacity: word1Opacity,
            transform: `translateY(${word1Y}px)`,
          }}>Missed texts</span>

          {/* missed bookings pill */}
          <div style={{
            transform: `translateY(${word2Y}px) scale(${pillScale})`,
            opacity: word2Opacity,
          }}>
            <div style={{
              backgroundColor: 'white',
              border: `2px solid ${theme.colors.amber}`,
              borderRadius: 40,
              padding: '10px 28px',
              fontSize: 42,
              fontFamily: 'Georgia, serif',
              color: theme.colors.amber,
              fontWeight: 600,
              boxShadow: `0 4px 15px ${theme.colors.amber}25`,
            }}>missed bookings</div>
          </div>

          <span style={{
            fontSize: 48,
            fontFamily: 'Georgia, serif',
            color: theme.colors.textDark,
            opacity: word3Opacity,
            transform: `translateY(${word3Y}px)`,
          }}>missed revenue</span>
        </div>

        {/* Green SVG cursor */}
        <svg
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            zIndex: 20,
            filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
          }}
          width="32"
          height="40"
          viewBox="0 0 24 30"
          fill="none"
        >
          <path
            d="M5 2L5 22L10 17L15 26L18 24.5L13 15.5L20 15.5L5 2Z"
            fill={theme.colors.amber}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ========== SCENE 4: Feature Cards (3D bottom-up) ==========
const Scene4_FeatureCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sphereScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Selected card glow
  const glowOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Cursor appears at frame 0, slowly makes its way to first card while cards animate in
  const cursorOpacity = interpolate(frame, [0, 5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Starts bottom-right, drifts to card 0, smooth glides between cards (13 frames each)
  const cursorTargetX = interpolate(
    frame,
    [0, 25, 55, 68, 93, 106],
    [1500, 696, 696, 960, 960, 1260],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );
  const cursorTargetYBase = interpolate(
    frame,
    [0, 25],
    [850, 440],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp', easing: Easing.bezier(0.4, 0, 0.2, 1) }
  );

  // Click dip — smooth press
  const clickDip0 = interpolate(frame, [27, 31, 35], [0, 8, 0], {
    extrapolateRight: 'clamp', extrapolateLeft: 'clamp',
  });
  const clickDip1 = interpolate(frame, [70, 74, 78], [0, 8, 0], {
    extrapolateRight: 'clamp', extrapolateLeft: 'clamp',
  });
  const clickDip2 = interpolate(frame, [108, 112, 116], [0, 8, 0], {
    extrapolateRight: 'clamp', extrapolateLeft: 'clamp',
  });
  const clickDip = clickDip0 + clickDip1 + clickDip2;

  // Which card is highlighted — smooth scale up over 10 frames
  const card0Highlight = interpolate(frame, [25, 35, 55, 63], [0, 1, 1, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const card1Highlight = interpolate(frame, [63, 73, 93, 101], [0, 1, 1, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const card2Highlight = interpolate(frame, [101, 111, 125, 132], [0, 1, 1, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const highlights = [card0Highlight, card1Highlight, card2Highlight];

  // SVG Icons — take color param
  const FlashcardsIcon = (c: string) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="2" width="16" height="12" rx="2" fill={c} opacity="0.6"/>
      <rect x="4" y="6" width="16" height="12" rx="2" fill={c} opacity="0.8"/>
      <rect x="2" y="10" width="16" height="12" rx="2" fill={c}/>
      <line x1="5" y1="14" x2="15" y2="14" stroke="white" strokeWidth="2"/>
      <line x1="5" y1="18" x2="12" y2="18" stroke="white" strokeWidth="2"/>
    </svg>
  );

  const MindmapIcon = (c: string) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="4" fill={c}/>
      <circle cx="6" cy="20" r="3" fill={c}/>
      <circle cx="14" cy="22" r="3" fill={c}/>
      <circle cx="22" cy="20" r="3" fill={c}/>
      <line x1="14" y1="10" x2="7" y2="17" stroke={c} strokeWidth="2"/>
      <line x1="14" y1="10" x2="14" y2="19" stroke={c} strokeWidth="2"/>
      <line x1="14" y1="10" x2="21" y2="17" stroke={c} strokeWidth="2"/>
    </svg>
  );

  const SummaryIcon = (c: string) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="2" width="20" height="24" rx="3" fill={c} opacity="0.15" stroke={c} strokeWidth="2"/>
      <line x1="8" y1="8" x2="20" y2="8" stroke={c} strokeWidth="2"/>
      <line x1="8" y1="13" x2="18" y2="13" stroke={c} strokeWidth="2"/>
      <line x1="8" y1="18" x2="16" y2="18" stroke={c} strokeWidth="2"/>
    </svg>
  );

  const cards = [
    { icon: FlashcardsIcon, name: 'Bookings', subtitle: '24/7 Scheduling', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
    { icon: MindmapIcon, name: 'Replies', subtitle: 'Instant WhatsApp responses', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
    { icon: SummaryIcon, name: 'Reminders', subtitle: 'Fewer no-shows, more revenue', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
  ];

  // Burst out at the end
  const sceneOutOpacity = interpolate(frame, [132, 138], [1, 0], {
    easing: Easing.bezier(0.4, 0, 1, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  const sceneOutScale = interpolate(frame, [132, 138], [1, 1.3], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Punch in at the start
  const sceneInOpacity = interpolate(frame, [0, 6], [0, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  const sceneInScale = interpolate(frame, [0, 6], [1.3, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Content with transitions */}
      <AbsoluteFill style={{
        opacity: sceneInOpacity * sceneOutOpacity,
        transform: `scale(${sceneInScale * sceneOutScale})`,
      }}>
      {/* Green pedestal under cards */}
      <div style={{
        position: 'absolute',
        top: '52%',
        left: '50%',
        transform: `translateX(-50%) scale(${Math.max(0, sphereScale)})`,
        width: 900,
        height: 300,
        borderRadius: '50%',
        background: `linear-gradient(180deg, ${theme.colors.peachLight} 0%, ${theme.colors.peach}60 100%)`,
        border: `2px solid ${theme.colors.amberLight}30`,
      }} />

      {/* Cards container with 3D perspective */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: 24,
        perspective: 1200,
      }}>
        {cards.map((card, i) => {
          const delay = i * 4;
          const cardY = interpolate(frame, [delay, delay + 14], [300, 0], {
            easing: Easing.bezier(0, 0, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardRotateX = interpolate(frame, [delay, delay + 14], [45, 0], {
            easing: Easing.bezier(0, 0, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardOpacity = interpolate(frame, [delay, delay + 8], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardScale = interpolate(frame, [delay, delay + 14], [0.8, 1], {
            easing: Easing.bezier(0, 0, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Highlight scale when cursor visits this card
          const highlightScale = 1 + (highlights[i] * 1.0);
          const highlightZ = highlights[i] * 50;

          return (
          <div
            key={i}
            style={{
              position: 'relative',
              width: 240,
              height: 160,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px) rotateX(${cardRotateX}deg) scale(${cardScale * highlightScale}) translateZ(${highlightZ}px)`,
              transformStyle: 'preserve-3d',
              transition: 'box-shadow 0.2s ease',
              zIndex: highlights[i] > 0.5 ? 10 : 1,
            }}
          >
            {/* Glow effect when highlighted */}
            {highlights[i] > 0 && (
              <div style={{
                position: 'absolute',
                top: -4,
                left: -4,
                right: -4,
                bottom: -4,
                borderRadius: 24,
                background: `${theme.colors.amber}40`,
                filter: 'blur(8px)',
                opacity: highlights[i],
              }} />
            )}

            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 24,
              border: `3px solid ${highlights[i] > 0.5 ? theme.colors.amber : card.borderColor}`,
              boxShadow: highlights[i] > 0.5
                ? `0 8px 30px ${theme.colors.amber}40`
                : '0 4px 15px rgba(0,0,0,0.06)',
            }}>
              {/* Icon in colored square — green when highlighted */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: highlights[i] > 0.5 ? `${theme.colors.amber}20` : `${card.color}15`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 24,
                marginBottom: 16,
              }}>
                {card.icon(highlights[i] > 0.5 ? theme.colors.amber : theme.colors.blue)}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: theme.colors.textDark }}>{card.name}</div>
              <div style={{ fontSize: 14, color: theme.colors.gray, marginTop: 4 }}>{card.subtitle}</div>
            </div>
          </div>
          );
        })}
      </div>

      {/* Green cursor icon moving between cards */}
      <svg
        style={{
          position: 'absolute',
          left: cursorTargetX,
          top: cursorTargetYBase + clickDip,
          opacity: cursorOpacity,
          zIndex: 20,
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
        }}
        width="32"
        height="40"
        viewBox="0 0 24 30"
        fill="none"
      >
        <path
          d="M5 2L5 22L10 17L15 26L18 24.5L13 15.5L20 15.5L5 2Z"
          fill={theme.colors.amber}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ========== SCENE 5+6: Envelope → Cursor Click → WhatsApp Mockup → Conversation ==========
const Scene5_EnvelopeToChat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const envW = 420;
  const envH = 220;
  const phoneW = 540;
  const phoneH = 1080;

  // === PHASE 1: Envelope (0-55) ===
  const envelopeScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const envelopeOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const flapAngle = interpolate(frame, [25, 45], [0, 180], {
    easing: Easing.bezier(0.4, 0, 0.2, 1), extrapolateRight: 'clamp', extrapolateLeft: 'clamp',
  });

  // Message rises out
  const msgRiseY = interpolate(frame, [42, 58], [60, -120], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msgRiseOpacity = interpolate(frame, [42, 50], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Envelope fades after message is out
  const envFadeOut = interpolate(frame, [55, 65], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // === PHASE 2: Cursor appears, clicks message card (58-72) ===
  const cursorOpacity = interpolate(frame, [58, 63], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cursorX = interpolate(frame, [58, 68], [1100, 1010], { easing: smoothEase, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const cursorBaseY = interpolate(frame, [58, 68], [650, 460], { easing: smoothEase, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  // Click dip
  const clickDip = interpolate(frame, [69, 71, 73], [0, 6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Cursor fades after click
  const cursorFadeOut = interpolate(frame, [73, 78], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // === PHASE 3: Click → burst out (72-78) ===
  const msgMoveX = 0;
  const msgMoveY = frame >= 72 ? -120 : msgRiseY;
  const msgBurstScale = interpolate(frame, [72, 78], [1, 1.5], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msgShrink = frame >= 72 ? msgBurstScale : 1;
  const msgCardFadeOut = interpolate(frame, [72, 78], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Phone slides up from bottom after burst
  const phoneOpacity = interpolate(frame, [82, 90], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const phoneSlideY = interpolate(frame, [82, 100], [500, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const phoneScaleBase = 1;

  // Zoom in on the phone — more zoomed in
  const phoneZoom = interpolate(frame, [82, 100], [1, 1.8], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // Aggressive pan down — snaps to follow each message
  const phonePanY = interpolate(
    frame,
    [100, 125, 133, 158, 166, 193, 201, 226, 234, 261, 269],
    [0, 0, -90, -90, -190, -190, -300, -300, -420, -420, -750],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  // === PHASE 4: Conversation — msg1 already there, typing dots before each reply ===
  // msg1 is always visible with the phone
  const msg1Opacity = phoneOpacity;

  // Typing dots 1 (before Luxe reply 1)
  const dots1Opacity = interpolate(frame, [105, 110], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const dots1FadeOut = interpolate(frame, [122, 125], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // msg2: Luxe reply — dots then message
  const msg2Opacity = interpolate(frame, [125, 133], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msg2Y = interpolate(frame, [125, 133], [15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Sarah typing dots (before msg3)
  const dots2Opacity = interpolate(frame, [140, 145], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const dots2FadeOut = interpolate(frame, [155, 158], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // msg3: Sarah — "Amara if she's free!"
  const msg3Opacity = interpolate(frame, [158, 166], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msg3Y = interpolate(frame, [158, 166], [15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Luxe typing dots (before msg4)
  const dots3Opacity = interpolate(frame, [172, 177], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const dots3FadeOut = interpolate(frame, [190, 193], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // msg4: Luxe — "11am or 2:30pm?"
  const msg4Opacity = interpolate(frame, [193, 201], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msg4Y = interpolate(frame, [193, 201], [15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Sarah typing dots (before msg5)
  const dots4Opacity = interpolate(frame, [208, 213], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const dots4FadeOut = interpolate(frame, [223, 226], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // msg5: Sarah — "2:30!"
  const msg5Opacity = interpolate(frame, [226, 234], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msg5Y = interpolate(frame, [226, 234], [15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Luxe typing dots (before msg6)
  const dots5Opacity = interpolate(frame, [240, 245], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const dots5FadeOut = interpolate(frame, [258, 261], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // msg6: Luxe — confirmation
  const msg6Opacity = interpolate(frame, [261, 269], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const msg6Y = interpolate(frame, [261, 269], [15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Burst down — hold last message 1 second longer
  const burstDownY = interpolate(frame, [315, 325], [0, 600], { easing: Easing.bezier(0.4, 0, 1, 1), extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const burstDownOpacity = interpolate(frame, [315, 325], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  // Chat bubble helper
  const chatBubbleStyle = (sent: boolean): React.CSSProperties => ({
    maxWidth: '75%',
    backgroundColor: sent ? '#DCF8C6' : 'white',
    borderRadius: sent ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
    padding: '14px 18px',
    fontSize: 20,
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: '#111',
    lineHeight: 1.45,
    alignSelf: sent ? 'flex-end' : 'flex-start',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
  });

  const typingDotsJSX = (sent: boolean, opacity: number) => (
    <div style={{
      alignSelf: sent ? 'flex-end' : 'flex-start',
      backgroundColor: sent ? '#DCF8C6' : 'white',
      borderRadius: sent ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      padding: '12px 18px', display: 'flex', gap: 5,
      opacity, boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    }}>
      {[0, 1, 2].map((d) => (
        <div key={d} style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#999',
          opacity: Math.abs(Math.sin((frame + d * 5) * 0.15)) * 0.6 + 0.4 }} />
      ))}
    </div>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>

      {/* === ENVELOPE === */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${Math.max(0, envelopeScale)})`,
        opacity: envelopeOpacity * envFadeOut,
        width: envW,
        height: envH + 160,
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: envW, height: envH, perspective: 800 }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, width: envW, height: envH / 2,
            transformOrigin: 'top center', transform: `rotateX(${flapAngle}deg)`,
            zIndex: flapAngle > 90 ? 0 : 15,
          }}>
            <svg width={envW} height={envH / 2} viewBox={`0 0 ${envW} ${envH / 2}`}>
              <path d={`M0 0 L${envW / 2} ${envH / 2} L${envW} 0 Z`} fill={theme.colors.amber} />
            </svg>
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: envW, height: envH, backgroundColor: theme.colors.peachLight, borderRadius: 20, zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: envW, height: envH, zIndex: 10, overflow: 'hidden', borderRadius: '0 0 20px 20px' }}>
            <svg width={envW} height={envH} viewBox={`0 0 ${envW} ${envH}`}>
              <path d={`M0 0 L${envW / 2} ${envH * 0.55} L${envW} 0 L${envW} ${envH} Q${envW} ${envH} ${envW - 20} ${envH} L20 ${envH} Q0 ${envH} 0 ${envH} Z`} fill={theme.colors.amberLight} />
              <path d={`M0 0 L${envW / 2} ${envH * 0.55} L${envW} 0`} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            </svg>
          </div>
          <div style={{ position: 'absolute', bottom: -15, left: '10%', width: '80%', height: 30, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.06)', filter: 'blur(10px)', zIndex: -1 }} />
        </div>
      </div>

      {/* === MESSAGE CARD — shrinks toward phone then disappears === */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${frame >= 72 ? msgMoveY : msgRiseY}px) translateX(${msgMoveX}px) scale(${frame >= 72 ? msgShrink : 1})`,
        width: 750,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: '40px 48px',
        boxShadow: '0 10px 50px rgba(0,0,0,0.12)',
        opacity: msgRiseOpacity * msgCardFadeOut,
        zIndex: 25,
      }}>
        <div style={{ fontSize: 22, color: theme.colors.amber, fontWeight: 600, marginBottom: 14 }}>Sarah M.</div>
        <div style={{ fontSize: 32, color: theme.colors.textDark, lineHeight: 1.5 }}>
          Hi! Can I book a haircut for this Saturday?
        </div>
        <div style={{ fontSize: 16, color: theme.colors.gray, marginTop: 16, textAlign: 'right' }}>2:14 PM</div>
      </div>

      {/* === GREEN SVG CURSOR === */}
      <svg
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorBaseY + clickDip,
          opacity: cursorOpacity * cursorFadeOut,
          zIndex: 30,
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
        }}
        width="32" height="40" viewBox="0 0 24 30" fill="none"
      >
        <path d="M5 2L5 22L10 17L15 26L18 24.5L13 15.5L20 15.5L5 2Z"
          fill={theme.colors.amber} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>

      {/* SAL label — slides out to left after a couple seconds */}
      <div style={{
        position: 'absolute',
        left: interpolate(frame, [85, 108, 157, 180], [-200, 180, 180, -200], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        top: '12%',
        opacity: interpolate(frame, [85, 98, 157, 175], [0, 1, 1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) * burstDownOpacity,
      }}>
        <div style={{
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          color: theme.colors.amber,
        }}>SAL</div>
      </div>

      {/* Answers label — slides out to right after a couple seconds */}
      <div style={{
        position: 'absolute',
        right: interpolate(frame, [100, 125, 157, 180], [-250, 180, 180, -250], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }),
        top: '12%',
        opacity: interpolate(frame, [100, 115, 157, 175], [0, 1, 1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }) * burstDownOpacity,
      }}>
        <div style={{
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          fontWeight: 700,
          color: theme.colors.amber,
        }}>Answers</div>
      </div>

      {/* === WHATSAPP PHONE MOCKUP === */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'top center',
        transform: `translate(-50%, -10%) translateY(${phoneSlideY + phonePanY + burstDownY}px) scale(${phoneScaleBase * phoneZoom})`,
        opacity: phoneOpacity * burstDownOpacity,
      }}>
      <div style={{
        width: phoneW,
        height: phoneH,
        borderRadius: 36,
        overflow: 'hidden',
        boxShadow: '0 20px 70px rgba(0,0,0,0.15)',
        border: '3px solid #2A2A2A',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Dark green header */}
        <div style={{
          backgroundColor: '#075E54',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M19 12H5M12 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
          <div style={{
            width: 34, height: 34, borderRadius: '50%', backgroundColor: '#ccc',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 16, color: '#666' }}>L</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: 'white', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
              Luxe Beauty
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366"><circle cx="12" cy="12" r="10" fill="#25D366"/><path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Business Account</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1,
          backgroundColor: '#ECE5DD',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          overflow: 'hidden',
        }}>
          {/* Message 1: Sarah — already there with phone */}
          <div style={{ ...chatBubbleStyle(false), opacity: msg1Opacity }}>
            Hi! Can I book a haircut for this Saturday?
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3 }}>2:14 PM</div>
          </div>

          {/* Luxe typing dots → msg2 */}
          {dots1Opacity > 0 && dots1FadeOut > 0 && typingDotsJSX(true, dots1Opacity * dots1FadeOut)}
          <div style={{ ...chatBubbleStyle(true), opacity: msg2Opacity, transform: `translateY(${msg2Y}px)` }}>
            Hi Sarah! Saturday is looking good 😊 Do you have a preferred stylist?
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
              2:14 PM
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 12 5 16 12 6"/><polyline points="7 12 11 16 18 6"/></svg>
            </div>
          </div>

          {/* Sarah typing dots → msg3 */}
          {dots2Opacity > 0 && dots2FadeOut > 0 && typingDotsJSX(false, dots2Opacity * dots2FadeOut)}
          <div style={{ ...chatBubbleStyle(false), opacity: msg3Opacity, transform: `translateY(${msg3Y}px)` }}>
            Amara if she's free!
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3 }}>2:15 PM</div>
          </div>

          {/* Luxe typing dots → msg4 */}
          {dots3Opacity > 0 && dots3FadeOut > 0 && typingDotsJSX(true, dots3Opacity * dots3FadeOut)}
          <div style={{ ...chatBubbleStyle(true), opacity: msg4Opacity, transform: `translateY(${msg4Y}px)` }}>
            She's got 11am or 2:30pm open. Which works better?
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
              2:15 PM
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 12 5 16 12 6"/><polyline points="7 12 11 16 18 6"/></svg>
            </div>
          </div>

          {/* Sarah typing dots → msg5 */}
          {dots4Opacity > 0 && dots4FadeOut > 0 && typingDotsJSX(false, dots4Opacity * dots4FadeOut)}
          <div style={{ ...chatBubbleStyle(false), opacity: msg5Opacity, transform: `translateY(${msg5Y}px)` }}>
            2:30!
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3 }}>2:16 PM</div>
          </div>

          {/* Luxe typing dots → msg6 */}
          {dots5Opacity > 0 && dots5FadeOut > 0 && typingDotsJSX(true, dots5Opacity * dots5FadeOut)}
          <div style={{ ...chatBubbleStyle(true), opacity: msg6Opacity, transform: `translateY(${msg6Y}px)` }}>
            Done! Haircut with Amara, Saturday 2:30pm. We'll send a reminder the day before 💫
            <div style={{ fontSize: 10, color: '#999', textAlign: 'right', marginTop: 3, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 3 }}>
              2:16 PM
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53BDEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 12 5 16 12 6"/><polyline points="7 12 11 16 18 6"/></svg>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div style={{
          backgroundColor: '#F0F0F0',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="10" r="0.5" fill="#999"/><circle cx="15" cy="10" r="0.5" fill="#999"/></svg>
          <div style={{
            flex: 1, backgroundColor: 'white', borderRadius: 20, padding: '8px 16px',
            fontSize: 14, color: '#999',
          }}>Type a message</div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', backgroundColor: '#075E54',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="white" strokeWidth="2"/></svg>
          </div>
        </div>
      </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 7: Grid of 4 client messages ==========
const Scene7_ClientMessages: React.FC = () => {
  const frame = useCurrentFrame();

  const questions = [
    'Book me a haircut for Saturday 2pm',
    'Can I reschedule my appointment to next week?',
    'I need to cancel my Thursday appointment',
    'What are your prices for balayage?',
  ];

  // Button appears after cards finish (last card done at ~42)
  const buttonOpacity = interpolate(frame, [45, 58], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttonScale = interpolate(frame, [45, 60], [0.8, 1], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
  });

  // Cursor appears early, slowly drifts to button, holds, then clicks
  const cursorOpacity = interpolate(frame, [80, 88], [0, 1], { extrapolateRight: 'clamp' });
  const cursorX = interpolate(frame, [80, 115], [1200, 990], { easing: Easing.bezier(0.25, 0, 0.4, 1), extrapolateRight: 'clamp' });
  const cursorBaseY = interpolate(frame, [80, 115], [750, 555], { easing: Easing.bezier(0.25, 0, 0.4, 1), extrapolateRight: 'clamp' });
  // Holds on button from 115-126, then clicks
  const clickDip = interpolate(frame, [126, 128, 130], [0, 8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorFadeOut = interpolate(frame, [132, 136], [1, 0], { extrapolateRight: 'clamp' });

  // Button press effect on click
  const buttonPress = interpolate(frame, [126, 128, 130, 133], [1, 0.92, 1.05, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Punch in at start
  const sceneInScale = interpolate(frame, [0, 8], [1.3, 1], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
  });
  const sceneInOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Zoom in starts after cards are done, smooth
  const zoomIn = interpolate(frame, [50, 74], [1, 1.45], {
    easing: Easing.bezier(0.15, 0, 0.4, 1),
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const sceneOutOpacity = 1;

  const combinedScale = sceneInScale * zoomIn;

  // Cards spread to corners as zoom increases
  const spreadAmount = interpolate(frame, [50, 74], [0, 40], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  // Spread directions: top-left, top-right, bottom-left, bottom-right
  const spreadOffsets = [
    { x: -spreadAmount, y: -spreadAmount },
    { x: spreadAmount, y: -spreadAmount },
    { x: -spreadAmount, y: spreadAmount },
    { x: spreadAmount, y: spreadAmount },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <AbsoluteFill style={{
        opacity: sceneInOpacity * sceneOutOpacity,
        transform: `scale(${combinedScale})`,
      }}>
      {/* 2x2 Grid */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 30,
        width: 1200,
      }}>
        {questions.map((q, i) => {
          const delay = i * 8;
          const cardOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const cardY = interpolate(frame, [delay, delay + 18], [25, 0], {
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: `${theme.colors.amber}08`,
                borderRadius: 24,
                padding: 45,
                boxShadow: `0 2px 15px ${theme.colors.amber}15`,
                border: `2px solid ${theme.colors.peachLight}`,
                opacity: cardOpacity,
                transform: `translateX(${spreadOffsets[i].x}px) translateY(${cardY + spreadOffsets[i].y}px)`,
                minHeight: 200,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                position: 'absolute',
                top: 18,
                left: 24,
                color: theme.colors.amber,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 1,
              }}>NEW MESSAGE</div>
              <div style={{
                fontSize: 22,
                color: theme.colors.textDark,
                textAlign: 'center',
                lineHeight: 1.4,
              }}>{q}</div>
            </div>
          );
        })}
      </div>

      {/* All handled by SAL button */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${buttonScale * buttonPress})`,
        background: `linear-gradient(135deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
        color: 'white',
        padding: '18px 36px',
        borderRadius: 16,
        fontSize: 20,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: `0 ${8 * buttonPress}px ${25 * buttonPress}px ${theme.colors.amber}60`,
        opacity: buttonOpacity,
        zIndex: 10,
      }}>
        <span>▶</span> All handled by SAL
      </div>

      {/* Green SVG cursor */}
      <svg
        style={{
          position: 'absolute',
          left: cursorX,
          top: cursorBaseY + clickDip,
          opacity: cursorOpacity * cursorFadeOut,
          zIndex: 20,
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
        }}
        width="32" height="40" viewBox="0 0 24 30" fill="none"
      >
        <path d="M5 2L5 22L10 17L15 26L18 24.5L13 15.5L20 15.5L5 2Z"
          fill={theme.colors.amber} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ========== SCENE 8: Client message typed with cursor ==========
const Scene8_ClientTyping: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = interpolate(frame, [0, 10], [1.3, 1], {
    easing: smoothOut,
    extrapolateRight: 'clamp',
  });

  const cardOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const fullQuestion = 'Hi! Do you have any slots for a haircut this Saturday?';
  const typingProgress = interpolate(frame, [20, 70], [0, fullQuestion.length], {
    extrapolateRight: 'clamp',
  });
  const visibleQuestion = fullQuestion.slice(0, Math.floor(typingProgress));

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Peach curved shapes in corners */}
      <div style={{
        position: 'absolute',
        top: -100,
        left: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `60px solid ${theme.colors.peachLight}`,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `60px solid ${theme.colors.peachLight}`,
        opacity: 0.6,
      }} />

      {/* Question card */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${cardScale})`,
        width: 700,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 50,
        border: '2px solid #E5E7EB',
        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
        opacity: cardOpacity,
      }}>
        <div style={{
          color: theme.colors.blue,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 30,
          textAlign: 'center',
          letterSpacing: 2,
        }}>CLIENT MESSAGE</div>

        <div style={{
          fontSize: 28,
          color: theme.colors.textDark,
          textAlign: 'center',
          minHeight: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {visibleQuestion}
          <span style={{
            opacity: frame % 30 < 15 ? 1 : 0,
            marginLeft: 2,
          }}>|</span>
        </div>

        <div style={{
          color: theme.colors.gray,
          fontSize: 14,
          marginTop: 40,
          textAlign: 'center',
        }}>SAL is typing...</div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 9: SAL's reply + action buttons ==========
const Scene9_SALReply: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = interpolate(frame, [0, 20], [0.9, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const buttonsY = interpolate(frame, [20, 40], [40, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const buttonsOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttons = [
    { label: 'Booked ✅', color: theme.colors.green, bgColor: theme.colors.greenLight, emoji: '📅' },
    { label: 'Reschedule', color: theme.colors.yellow, bgColor: theme.colors.yellowLight, emoji: '🔄' },
    { label: 'Waitlist', color: theme.colors.blue, bgColor: theme.colors.blueLight, emoji: '⏳' },
    { label: 'Upsell 💇‍♀️', color: theme.colors.purple, bgColor: theme.colors.purpleLight, emoji: '✨' },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Peach curved shapes */}
      <div style={{
        position: 'absolute',
        top: -100,
        left: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `60px solid ${theme.colors.peachLight}`,
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: '50%',
        border: `60px solid ${theme.colors.peachLight}`,
        opacity: 0.6,
      }} />

      {/* Answer card */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${cardScale})`,
        width: 700,
        backgroundColor: theme.colors.greenLight,
        borderRadius: 24,
        padding: 50,
        border: `3px solid ${theme.colors.greenBorder}`,
      }}>
        <div style={{
          color: theme.colors.green,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 25,
          textAlign: 'center',
          letterSpacing: 2,
        }}>SAL'S REPLY</div>

        <div style={{
          fontSize: 26,
          color: theme.colors.textDark,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Hey! Yes — I've got Saturday at 2pm or 4pm with Sarah. Want me to book you in? 😊
        </div>

        <div style={{
          color: theme.colors.green,
          fontSize: 14,
          marginTop: 30,
          textAlign: 'center',
        }}>Sent via WhatsApp</div>
      </div>

      {/* Action buttons */}
      <div style={{
        position: 'absolute',
        bottom: 150,
        left: '50%',
        transform: `translateX(-50%) translateY(${buttonsY}px)`,
        display: 'flex',
        gap: 20,
        opacity: buttonsOpacity,
      }}>
        {buttons.map((btn, i) => (
          <div
            key={i}
            style={{
              backgroundColor: btn.bgColor,
              border: `2px solid ${btn.color}`,
              borderRadius: 16,
              padding: '18px 36px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 26 }}>{btn.emoji}</span>
            <span style={{ color: btn.color, fontWeight: 600, fontSize: 15 }}>{btn.label}</span>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 10: SAL speaks their language + multilingual ==========
const Scene10_Multilingual: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const languages = [
    { name: 'English', native: 'Hello!', flag: '🇬🇧' },
    { name: 'Arabic', native: '!مرحبا', flag: '🇸🇦' },
    { name: 'French', native: 'Bonjour!', flag: '🇫🇷' },
    { name: 'Spanish', native: '¡Hola!', flag: '🇪🇸' },
    { name: 'Thai', native: 'สวัสดี!', flag: '🇹🇭' },
    { name: 'Portuguese', native: 'Olá!', flag: '🇧🇷' },
    { name: 'Mandarin', native: '你好!', flag: '🇨🇳' },
    { name: 'Tagalog', native: 'Kumusta!', flag: '🇵🇭' },
  ];

  // Click timings — evenly spaced, slight acceleration at end
  const clickFrames = [0, 45, 65, 83, 99, 115, 131, 145];

  // Which language is showing
  let currentLang = 0;
  for (let i = clickFrames.length - 1; i >= 0; i--) {
    if (frame >= clickFrames[i]) {
      currentLang = i;
      break;
    }
  }

  const lang = languages[currentLang];

  // Start smaller, fade in
  const sceneInScale = interpolate(frame, [0, 15], [1.2, 1], { easing: smoothOut, extrapolateRight: 'clamp' });
  const sceneInOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

  // Start small, slow zoom in — stops right before first click at 33
  // Zoom starts with cursor, both arrive at frame 42
  const preZoom = interpolate(frame, [20, 42], [0.85, 1.05], {
    easing: Easing.bezier(0.25, 0, 0.5, 1),
    extrapolateRight: 'clamp',
  });

  // Card flashes green on click then content swaps
  let greenFlash = 0;
  for (const cf of clickFrames.slice(1)) {
    greenFlash += interpolate(frame, [cf, cf + 4, cf + 10], [0, 1, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
  }
  greenFlash = Math.min(greenFlash, 1);

  // Button press on each click — squish + bounce
  let buttonPressScale = 1;
  for (const cf of clickFrames.slice(1)) {
    const press = interpolate(frame, [cf - 2, cf, cf + 3, cf + 6], [1, 0.88, 1.06, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    if (frame >= cf - 2 && frame <= cf + 6) {
      buttonPressScale = press;
    }
  }

  // Cursor — appears during zoom, arrives at button exactly when zoom finishes
  // Cursor appears after scene settles, moves with zoom toward button
  const cursorOpacity = interpolate(frame, [20, 26], [0, 1], { extrapolateRight: 'clamp' });
  const cursorX = interpolate(frame, [20, 42], [1200, 960], { easing: Easing.bezier(0.25, 0, 0.4, 1), extrapolateRight: 'clamp' });
  const cursorBaseY = interpolate(frame, [20, 42], [850, 785], { easing: Easing.bezier(0.25, 0, 0.4, 1), extrapolateRight: 'clamp' });
  // Cursor dips on each click
  let cursorDip = 0;
  for (const cf of clickFrames.slice(1)) {
    cursorDip += interpolate(frame, [cf - 2, cf, cf + 3], [0, 8, 0], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
  }
  const cursorFadeOut = interpolate(frame, [148, 153], [1, 0], { extrapolateRight: 'clamp' });

  // Burst out
  // Pop out — quick scale up then snap down to 0
  const burstScale = interpolate(frame, [162, 166, 170], [1, 1.15, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const burstOpacity = interpolate(frame, [166, 170], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      <AbsoluteFill style={{
        opacity: sceneInOpacity * burstOpacity,
        transform: `scale(${sceneInScale * preZoom * (frame >= 170 ? burstScale : 1)})`,
      }}>
        {/* Title — above the card, mask reveal left to right */}
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          overflow: 'hidden',
          width: interpolate(frame, [3, 20], [0, 650], {
            easing: smoothEase,
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
        }}>
          <div style={{
            fontSize: 44,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            color: theme.colors.amber,
            whiteSpace: 'nowrap',
            width: 650,
            textAlign: 'center',
          }}>SAL speaks any language</div>
        </div>

        {/* Language card — slides up right after title */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translateY(${interpolate(frame, [12, 22], [50, 0], { easing: smoothOut, extrapolateRight: 'clamp' })}px)`,
          opacity: interpolate(frame, [12, 20], [0, 1], { extrapolateRight: 'clamp' }),
          width: 500,
          backgroundColor: greenFlash > 0
            ? `rgba(45, 182, 104, ${greenFlash * 0.15})`
            : 'white',
          borderRadius: 28,
          padding: '50px 40px',
          border: `3px solid ${theme.colors.amber}`,
          boxShadow: `0 15px 50px rgba(0,0,0,0.08)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}>
          <span style={{ fontSize: 64 }}>{lang.flag}</span>
          <div style={{
            fontSize: 48,
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            color: theme.colors.amber,
          }}>{lang.native}</div>
          <div style={{
            fontSize: 22,
            color: theme.colors.gray,
          }}>{lang.name}</div>
        </div>

        {/* Next arrow button — fades in */}
        <div style={{
          position: 'absolute',
          top: '72%',
          left: '50%',
          transform: `translateX(-50%) scale(${buttonPressScale})`,
          opacity: interpolate(frame, [18, 24], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
            width: 60,
            height: 60,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 ${6 * buttonPressScale}px ${20 * buttonPressScale}px ${theme.colors.amber}40`,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Progress dots — fades in */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
          opacity: interpolate(frame, [20, 26], [0, 1], { extrapolateRight: 'clamp' }),
        }}>
          {languages.map((_, i) => (
            <div key={i} style={{
              width: i === currentLang ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === currentLang ? theme.colors.amber : `${theme.colors.amber}30`,
              transition: 'width 0.2s',
            }} />
          ))}
        </div>

        {/* Green SVG cursor */}
        <svg
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorBaseY + cursorDip,
            opacity: cursorOpacity * cursorFadeOut,
            zIndex: 20,
            filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
          }}
          width="32" height="40" viewBox="0 0 24 30" fill="none"
        >
          <path d="M5 2L5 22L10 17L15 26L18 24.5L13 15.5L20 15.5L5 2Z"
            fill={theme.colors.amber} stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ========== SCENE 11: "Never miss again" ==========
const Scene11_NeverMiss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ['Never', 'miss', 'a', 'booking', 'again'];

  // Punch in
  const sceneInOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
  const sceneInScale = interpolate(frame, [0, 8], [1.3, 1], { easing: smoothOut, extrapolateRight: 'clamp' });

  // Card springs in
  const modalScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const modalOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Spinning pinwheel
  const rotation = interpolate(frame, [0, 120], [0, 360], { extrapolateRight: 'extend' });

  // Everything exits together
  const cardFadeOut = 1; // card stays until burst
  const cardScaleOut = 1;

  // Burst out — text + card + everything at once
  const burstScale = interpolate(frame, [60, 70], [1, 1.4], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
  const burstOpacity = interpolate(frame, [60, 70], [1, 0], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      <AbsoluteFill style={{
        opacity: sceneInOpacity * burstOpacity,
        transform: `scale(${sceneInScale * (frame >= 60 ? burstScale : 1)})`,
      }}>
        {/* Subtle radial glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1400,
          height: 1400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.colors.amber}12 0%, transparent 60%)`,
        }} />

        {/* Left text — "Never miss a" */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 200,
          transform: 'translateY(-50%)',
        }}>
          {['Never', 'miss', 'a'].map((word, i) => {
            const wordDelay = 5 + i * 7;
            const wordOpacity = interpolate(frame, [wordDelay, wordDelay + 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            const wordY = interpolate(frame, [wordDelay, wordDelay + 12], [30, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            return (
              <div key={i} style={{
                fontSize: 72,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color: theme.colors.amber,
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                lineHeight: 1.15,
              }}>{word}</div>
            );
          })}
        </div>

        {/* Right text — "booking again" */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: 200,
          transform: 'translateY(-50%)',
          textAlign: 'right',
        }}>
          {['booking', 'again'].map((word, i) => {
            const wordDelay = 26 + i * 7;
            const wordOpacity = interpolate(frame, [wordDelay, wordDelay + 10], [0, 1], { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            const wordY = interpolate(frame, [wordDelay, wordDelay + 12], [30, 0], { easing: smoothOut, extrapolateRight: 'clamp', extrapolateLeft: 'clamp' });
            return (
              <div key={i} style={{
                fontSize: 72,
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                color: theme.colors.amber,
                opacity: wordOpacity,
                transform: `translateY(${wordY}px)`,
                lineHeight: 1.15,
              }}>{word}</div>
            );
          })}
        </div>

        {/* Right side — original card */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${modalScale * cardScaleOut})`,
          width: 400,
          backgroundColor: 'white',
          borderRadius: 28,
          padding: 30,
          border: `3px solid ${theme.colors.amber}`,
          boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
          opacity: modalOpacity * cardFadeOut,
        }}>
          <div style={{ fontSize: 16, color: theme.colors.gray, marginBottom: 24 }}>Your Smartest Hire</div>

          {/* 5-petal flower pinwheel */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div style={{ width: 110, height: 110, transform: `rotate(${rotation}deg)`, position: 'relative' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  position: 'absolute', top: '50%', left: '50%', width: 45, height: 45,
                  backgroundColor: theme.colors.amber, borderRadius: '50% 50% 50% 0',
                  opacity: 0.6 + (i * 0.08),
                  transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-20px)`,
                  transformOrigin: 'center center',
                }} />
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', color: theme.colors.gray, marginBottom: 28 }}>
            <span style={{ color: theme.colors.amber, fontSize: 12, marginRight: 6 }}>●</span>
            Always on...
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, alignItems: 'center' }}>
            <div style={{ backgroundColor: theme.colors.grayLight, padding: '12px 20px', borderRadius: 12, fontSize: 14, color: theme.colors.textDark, fontWeight: 500 }}>24/7</div>
            <div style={{ backgroundColor: theme.colors.grayLight, padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textDark} strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div style={{ backgroundColor: theme.colors.amber, color: 'white', padding: '12px 24px', borderRadius: 24, fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Chat
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ========== SCENE 12: Final Logo — meetsal.ai ==========
const Scene12_FinalLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        opacity: logoOpacity,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Logo icon */}
          <div style={{
            width: 80,
            height: 80,
            background: `linear-gradient(145deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
            borderRadius: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `0 8px 30px ${theme.colors.amber}50`,
          }}>
            <span style={{
              fontSize: 48,
              fontFamily: 'Georgia, serif',
              color: 'white',
              fontWeight: 400,
            }}>S</span>
          </div>

          {/* Logo text */}
          <span style={{
            fontSize: 64,
            fontFamily: 'Georgia, serif',
            color: theme.colors.amber,
          }}>meetsal.ai</span>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 26,
          color: theme.colors.amber,
          opacity: subtitleOpacity,
          fontFamily: 'Georgia, serif',
        }}>
          Your Smartest Hire
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== MAIN VIDEO (35s @ 30fps = 1051 frames) ==========
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Audio */}
      <Audio src={staticFile('audio.mp3')} />

      {/* Scene 3: Pain Point — hits on the bass drop (3.23s) */}
      <Sequence from={97} durationInFrames={68}>
        <Scene3_PainPoint />
      </Sequence>

      {/* Scene 1: SAL Logo → meetsal.ai → bass drop out (0-3.4s) — rendered after so burst shows on top */}
      <Sequence from={0} durationInFrames={102}>
        <Scene1_LogoIntro />
      </Sequence>

      {/* Scene 4: Feature Cards — overlaps Scene 3 burst out */}
      <Sequence from={159} durationInFrames={150}>
        <Scene4_FeatureCards />
      </Sequence>

      {/* Scene 5+6: Envelope → Phone → Conversation */}
      <Sequence from={301} durationInFrames={330}>
        <Scene5_EnvelopeToChat />
      </Sequence>

      {/* Scene 7: Grid of client messages */}
      <Sequence from={621} durationInFrames={148}>
        <Scene7_ClientMessages />
      </Sequence>

      {/* Scene 10: Language showcase — overlaps Scene 7 exit */}
      <Sequence from={750} durationInFrames={180}>
        <Scene10_Multilingual />
      </Sequence>

      {/* Scene 11: Never miss a booking again */}
      <Sequence from={923} durationInFrames={75}>
        <Scene11_NeverMiss />
      </Sequence>

      {/* Scene 12: Final Logo — overlaps Scene 11 burst */}
      <Sequence from={988} durationInFrames={90}>
        <Scene12_FinalLogo />
      </Sequence>
    </AbsoluteFill>
  );
};
