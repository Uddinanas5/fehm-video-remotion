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

  // Font size: scales up (0-20), then shrinks into icon (20-45)
  const salFontSize = interpolate(frame, [0, 20, 45], [120, 140, 34], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Grid: fades in (0-20), then fades out (20-35)
  const gridOpacity = interpolate(frame, [3, 20, 35], [0, 0.5, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Background: green gradient → cream (starts at frame 20)
  const bgTransition = interpolate(frame, [20, 42], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Text shadow fades out as it shrinks
  const shadowOpacity = interpolate(frame, [20, 35], [0.25, 0], {
    extrapolateRight: 'clamp',
  });

  // Icon box appears behind SAL as it shrinks
  const iconBoxOpacity = interpolate(frame, [32, 45], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const iconBoxScale = interpolate(frame, [32, 45], [0.5, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // meetsal.ai reveals simultaneously with SAL sliding left
  const textReveal = interpolate(frame, [47, 65], [0, 100], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [47, 52], [0, 1], {
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

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${theme.colors.peachLight} 0%, ${theme.colors.peach} 50%, ${theme.colors.amber} 100%)`,
    }}>
      {/* Cream overlay that fades in */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: theme.colors.cream,
        opacity: bgTransition,
      }} />

      {/* Crosshair grid lines */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: gridOpacity }}>
        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="67%" x2="100%" y2="67%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
      </svg>

      {/* SAL + meetsal.ai row */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${breatheScale * dropScale})`,
        display: 'flex',
        alignItems: 'center',
        opacity: logoOpacity * dropOpacity,
      }}>
        {/* SAL icon */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {/* Green box */}
          <div style={{
            position: 'absolute',
            width: 110,
            height: 85,
            background: `linear-gradient(145deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
            borderRadius: 18,
            opacity: iconBoxOpacity,
            transform: `scale(${iconBoxScale})`,
            boxShadow: '0 6px 20px rgba(45, 182, 104, 0.3)',
          }} />

          {/* SAL text */}
          <div style={{
            position: 'relative',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            color: 'white',
            fontSize: salFontSize,
            textShadow: `4px 4px 12px rgba(0,0,0,${shadowOpacity})`,
            letterSpacing: salFontSize > 40 ? 4 : 2,
            whiteSpace: 'nowrap',
          }}>SAL</div>
        </div>

        {/* meetsal.ai — slides out from behind the SAL icon */}
        <div style={{
          overflow: 'hidden',
          width: interpolate(frame, [47, 65], [0, 430], {
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            extrapolateRight: 'clamp',
            extrapolateLeft: 'clamp',
          }),
          flexShrink: 0,
        }}>
          <span style={{
            fontSize: 64,
            fontFamily: 'Georgia, serif',
            color: theme.colors.amber,
            whiteSpace: 'nowrap',
            opacity: textOpacity,
            marginLeft: 16,
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

  // Staggered text
  const word1Opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const word1Y = interpolate(frame, [0, 10], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

  const word2Opacity = interpolate(frame, [13, 23], [0, 1], { extrapolateRight: 'clamp' });
  const word2Y = interpolate(frame, [13, 23], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

  const word3Opacity = interpolate(frame, [26, 36], [0, 1], { extrapolateRight: 'clamp' });
  const word3Y = interpolate(frame, [26, 36], [20, 0], { easing: smoothOut, extrapolateRight: 'clamp' });

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
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          {/* Missed texts */}
          <div style={{
            fontSize: 56,
            fontFamily: 'Georgia, serif',
            color: theme.colors.textDark,
            opacity: word1Opacity,
            transform: `translateY(${word1Y}px)`,
            marginBottom: 16,
          }}>Missed texts</div>

          {/* missed bookings pill */}
          <div style={{
            display: 'inline-block',
            opacity: word2Opacity,
            transform: `translateY(${word2Y}px) scale(${pillScale})`,
            marginBottom: 16,
          }}>
            <div style={{
              backgroundColor: `${theme.colors.amber}15`,
              border: `2px solid ${theme.colors.amber}`,
              borderRadius: 40,
              padding: '12px 32px',
              fontSize: 48,
              fontFamily: 'Georgia, serif',
              color: theme.colors.amber,
              fontWeight: 600,
            }}>missed bookings</div>
          </div>

          {/* missed revenue */}
          <div style={{
            fontSize: 56,
            fontFamily: 'Georgia, serif',
            color: theme.colors.textDark,
            opacity: word3Opacity,
            transform: `translateY(${word3Y}px)`,
          }}>missed revenue</div>
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
    { icon: SummaryIcon, name: 'Reminders', subtitle: 'No-shows go to zero', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
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

// ========== SCENE 5: Incoming WhatsApp Message ==========
const Scene5_IncomingMessage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modalScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const modalOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Folder drag animation
  const folderY = interpolate(frame, [20, 50], [150, 0], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const folderOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const folderScale = interpolate(frame, [40, 55], [1, 0.8], {
    extrapolateRight: 'clamp',
  });

  // Cursor follows folder
  const cursorX = interpolate(frame, [20, 50], [900, 760], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const cursorY = interpolate(frame, [20, 50], [650, 500], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Blue curved shapes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: -100,
        width: 500,
        height: '100%',
        background: 'linear-gradient(180deg, #E8F0FF 0%, #B8D4FF 100%)',
        borderRadius: '0 250px 250px 0',
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: -100,
        width: 500,
        height: '100%',
        background: 'linear-gradient(180deg, #E8F0FF 0%, #B8D4FF 100%)',
        borderRadius: '250px 0 0 250px',
        opacity: 0.7,
      }} />

      {/* Modal */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${modalScale})`,
        width: 750,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 32,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        border: '1px solid #E5E7EB',
        opacity: modalOpacity,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>Incoming Messages</span>
          <div style={{
            backgroundColor: theme.colors.blue,
            color: 'white',
            padding: '10px 22px',
            borderRadius: 24,
            fontSize: 15,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            WhatsApp
          </div>
        </div>

        {/* Dashed upload area */}
        <div style={{
          border: '2px dashed #D1D5DB',
          borderRadius: 16,
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 180,
          position: 'relative',
        }}>
          <div style={{ fontSize: 32, color: '#9CA3AF', marginBottom: 12 }}>↑</div>
        </div>
      </div>

      {/* 3D Folder being dragged */}
      <div style={{
        position: 'absolute',
        top: 400,
        left: '50%',
        transform: `translate(-50%, ${folderY}px) scale(${folderScale})`,
        opacity: folderOpacity,
      }}>
        <div style={{
          position: 'absolute',
          top: 10,
          left: 10,
          width: 140,
          height: 110,
          backgroundColor: 'rgba(0,0,0,0.15)',
          borderRadius: 16,
          filter: 'blur(10px)',
        }} />
        <div style={{
          position: 'relative',
          width: 140,
          height: 110,
          background: 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
        }}>
          <div style={{
            position: 'absolute',
            top: -12,
            left: 16,
            width: 50,
            height: 16,
            backgroundColor: '#60A5FA',
            borderRadius: '8px 8px 0 0',
          }} />
          <div style={{ marginTop: 20 }}>
            <div style={{ width: '80%', height: 8, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 4, marginBottom: 8 }} />
            <div style={{ width: '60%', height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4 }} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 16,
            right: 16,
            fontSize: 12,
            color: 'white',
            fontWeight: 500,
          }}>
            New Client Inquiry
          </div>
        </div>
      </div>

      {/* Hand cursor */}
      <div style={{
        position: 'absolute',
        left: cursorX,
        top: cursorY,
        fontSize: 32,
        opacity: folderOpacity,
        transform: 'rotate(-15deg)',
      }}>👆</div>
    </AbsoluteFill>
  );
};

// ========== SCENE 6: Message + SAL is on it ==========
const Scene6_SALOnIt: React.FC = () => {
  const frame = useCurrentFrame();

  const fileOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttonOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttonScale = interpolate(frame, [15, 35], [0.9, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const cursorX = interpolate(frame, [35, 55], [1000, 850], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const cursorY = interpolate(frame, [35, 55], [500, 650], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const cursorOpacity = interpolate(frame, [35, 45], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Blue curved shapes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: -100,
        width: 500,
        height: '100%',
        background: 'linear-gradient(180deg, #E8F0FF 0%, #B8D4FF 100%)',
        borderRadius: '0 250px 250px 0',
        opacity: 0.7,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        right: -100,
        width: 500,
        height: '100%',
        background: 'linear-gradient(180deg, #E8F0FF 0%, #B8D4FF 100%)',
        borderRadius: '250px 0 0 250px',
        opacity: 0.7,
      }} />

      {/* Modal with message */}
      <div style={{
        position: 'absolute',
        top: '42%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 32,
        boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
        border: '1px solid #E5E7EB',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>Incoming Messages</span>
          <div style={{
            backgroundColor: theme.colors.blue,
            color: 'white',
            padding: '10px 22px',
            borderRadius: 24,
            fontSize: 15,
            fontWeight: 500,
          }}>WhatsApp</div>
        </div>

        <div style={{
          border: '2px dashed #D1D5DB',
          borderRadius: 16,
          padding: 40,
        }}>
          <div style={{
            backgroundColor: theme.colors.blueLight,
            borderRadius: 12,
            padding: '16px 24px',
            opacity: fileOpacity,
          }}>
            <span style={{ color: theme.colors.textDark, fontSize: 17, fontWeight: 500 }}>Hey, do you have any availability this Saturday?</span>
          </div>
        </div>
      </div>

      {/* SAL is on it button */}
      <div style={{
        position: 'absolute',
        top: '72%',
        left: '50%',
        transform: `translateX(-50%) scale(${buttonScale})`,
        background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
        color: 'white',
        padding: '18px 36px',
        borderRadius: 32,
        fontSize: 18,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
        opacity: buttonOpacity,
      }}>
        <span style={{ fontSize: 20 }}>✨</span> SAL is on it
      </div>

      {/* Cursor */}
      <div style={{
        position: 'absolute',
        left: cursorX,
        top: cursorY,
        fontSize: 32,
        opacity: cursorOpacity,
      }}>👆</div>
    </AbsoluteFill>
  );
};

// ========== SCENE 7: Grid of 4 client messages ==========
const Scene7_ClientMessages: React.FC = () => {
  const frame = useCurrentFrame();

  const questions = [
    'Book me a haircut for Saturday 2pm',
    'Do you offer nail extensions?',
    'I need to cancel my Thursday appointment',
    'What are your prices for balayage?',
  ];

  const buttonOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const buttonScale = interpolate(frame, [35, 55], [0.8, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
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
                backgroundColor: 'white',
                borderRadius: 24,
                padding: 45,
                boxShadow: '0 2px 15px rgba(0,0,0,0.04)',
                border: '2px solid #E5E7EB',
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{
                color: theme.colors.blue,
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 20,
                letterSpacing: 1,
              }}>NEW</div>
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
        transform: `translate(-50%, -50%) scale(${buttonScale})`,
        background: `linear-gradient(135deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
        color: 'white',
        padding: '18px 36px',
        borderRadius: 16,
        fontSize: 20,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: `0 8px 25px ${theme.colors.amber}60`,
        opacity: buttonOpacity,
        zIndex: 10,
      }}>
        <span>✨</span> All handled by SAL
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 8: Client message typed with cursor ==========
const Scene8_ClientTyping: React.FC = () => {
  const frame = useCurrentFrame();

  const cardScale = interpolate(frame, [0, 20], [0.9, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  const cardOpacity = interpolate(frame, [0, 15], [0, 1], {
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

  const cardScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const cardOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const cursorOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const cursorY = interpolate(frame, [40, 60], [0, 30], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  // Pinwheel rotation
  const rotation = interpolate(frame, [0, 120], [0, 90], {
    extrapolateRight: 'extend',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      {/* Filled rounded rectangle shapes */}
      <div style={{
        position: 'absolute',
        top: 50,
        left: 140,
        width: 400,
        height: 200,
        borderRadius: 50,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        top: 50,
        right: 140,
        width: 400,
        height: 200,
        borderRadius: 50,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 50,
        left: 140,
        width: 400,
        height: 200,
        borderRadius: 50,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 50,
        right: 140,
        width: 400,
        height: 200,
        borderRadius: 50,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />

      {/* Card */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${cardScale})`,
        width: 420,
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 32,
        border: `3px solid ${theme.colors.amber}`,
        boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
        opacity: cardOpacity,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          {/* Pinwheel icon */}
          <div style={{
            width: 50,
            height: 50,
            transform: `rotate(${rotation}deg)`,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: theme.colors.amber,
                  borderRadius: i % 2 === 0 ? '50% 0 50% 50%' : '0 50% 50% 50%',
                  opacity: 0.7 + (i * 0.1),
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>SAL speaks their language</span>
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
          color: 'white',
          padding: '16px 32px',
          borderRadius: 32,
          fontSize: 18,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          boxShadow: `0 6px 20px ${theme.colors.amber}50`,
        }}>
          <span style={{ fontSize: 20 }}>🌍</span> English, Arabic, Spanish + more
        </div>
      </div>

      {/* Cursor */}
      <div style={{
        position: 'absolute',
        top: 580 + cursorY,
        left: 870,
        fontSize: 32,
        opacity: cursorOpacity,
      }}>👆</div>
    </AbsoluteFill>
  );
};

// ========== SCENE 11: "Never miss again" ==========
const Scene11_NeverMiss: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const modalScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const modalOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const heyOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const thereOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Spinning pinwheel
  const rotation = interpolate(frame, [0, 120], [0, 360], {
    extrapolateRight: 'extend',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      {/* Filled rounded rectangle shapes */}
      <div style={{
        position: 'absolute',
        top: 30,
        left: 140,
        width: 420,
        height: 220,
        borderRadius: 60,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        top: 30,
        right: 140,
        width: 420,
        height: 220,
        borderRadius: 60,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: 140,
        width: 420,
        height: 220,
        borderRadius: 60,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 30,
        right: 140,
        width: 420,
        height: 220,
        borderRadius: 60,
        backgroundColor: theme.colors.peachLight,
        opacity: 0.5,
      }} />

      {/* "Never miss" text - LEFT side */}
      <div style={{
        position: 'absolute',
        left: 280,
        top: '50%',
        transform: 'translateY(-50%)',
      }}>
        <div style={{
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          color: theme.colors.amber,
          fontWeight: 700,
          opacity: heyOpacity,
        }}>Never</div>
        <div style={{
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          color: theme.colors.peach,
          fontWeight: 400,
          opacity: thereOpacity,
        }}>miss</div>
      </div>

      {/* "again" text - RIGHT side */}
      <div style={{
        position: 'absolute',
        right: 280,
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: interpolate(frame, [45, 60], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        <div style={{
          fontSize: 72,
          fontFamily: 'Georgia, serif',
          color: theme.colors.amber,
          fontWeight: 700,
        }}>again</div>
      </div>

      {/* Modal - CENTERED */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${modalScale})`,
        width: 400,
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 30,
        border: `3px solid ${theme.colors.amber}`,
        boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
        opacity: modalOpacity,
      }}>
        <div style={{ fontSize: 16, color: theme.colors.gray, marginBottom: 24 }}>Your AI Receptionist</div>

        {/* 5-petal flower pinwheel */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          <div style={{
            width: 110,
            height: 110,
            transform: `rotate(${rotation}deg)`,
            position: 'relative',
          }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 45,
                  height: 45,
                  backgroundColor: theme.colors.amber,
                  borderRadius: '50% 50% 50% 0',
                  opacity: 0.6 + (i * 0.08),
                  transform: `translate(-50%, -50%) rotate(${i * 72}deg) translateY(-20px)`,
                  transformOrigin: 'center center',
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', color: theme.colors.gray, marginBottom: 28 }}>
          <span style={{
            color: theme.colors.amber,
            fontSize: 12,
            marginRight: 6,
          }}>●</span>
          Always on...
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, alignItems: 'center' }}>
          <div style={{
            backgroundColor: theme.colors.grayLight,
            padding: '12px 20px',
            borderRadius: 12,
            fontSize: 14,
            color: theme.colors.textDark,
            fontWeight: 500,
          }}>24/7</div>
          <div style={{
            backgroundColor: theme.colors.grayLight,
            padding: '12px 16px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textDark} strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: theme.colors.amber,
            color: 'white',
            padding: '12px 24px',
            borderRadius: 24,
            fontSize: 15,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            Chat
          </div>
        </div>
      </div>
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
          Your AI Receptionist
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

      {/* Scene 5: Incoming Message — overlaps Scene 4 fade out */}
      <Sequence from={301} durationInFrames={90}>
        <Scene5_IncomingMessage />
      </Sequence>

      {/* Scene 6: Message + SAL is on it */}
      <Sequence from={391} durationInFrames={90}>
        <Scene6_SALOnIt />
      </Sequence>

      {/* Scene 7: Grid of client messages */}
      <Sequence from={481} durationInFrames={90}>
        <Scene7_ClientMessages />
      </Sequence>

      {/* Scene 8: Client message typed */}
      <Sequence from={571} durationInFrames={90}>
        <Scene8_ClientTyping />
      </Sequence>

      {/* Scene 9: SAL's reply + actions */}
      <Sequence from={661} durationInFrames={90}>
        <Scene9_SALReply />
      </Sequence>

      {/* Scene 10: Speaks their language */}
      <Sequence from={751} durationInFrames={90}>
        <Scene10_Multilingual />
      </Sequence>

      {/* Scene 11: Never miss again */}
      <Sequence from={841} durationInFrames={120}>
        <Scene11_NeverMiss />
      </Sequence>

      {/* Scene 12: Final Logo */}
      <Sequence from={961} durationInFrames={90}>
        <Scene12_FinalLogo />
      </Sequence>
    </AbsoluteFill>
  );
};
