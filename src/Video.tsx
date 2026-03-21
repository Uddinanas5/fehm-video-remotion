import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, Easing, Audio, staticFile, spring, useVideoConfig } from 'remotion';

// ========== SMOOTH EASING CURVES ==========
const smoothEase = Easing.bezier(0.4, 0, 0.2, 1); // Standard smooth ease
const smoothIn = Easing.bezier(0.4, 0, 1, 1);      // Ease in
const smoothOut = Easing.bezier(0, 0, 0.2, 1);     // Ease out  
const smoothInOut = Easing.bezier(0.4, 0, 0.2, 1); // Ease in-out
const gentleSpring = { damping: 15, stiffness: 100, mass: 1 }; // Gentle spring config

// ========== THEME (UPDATED TO MATCH ORIGINAL) ==========
const theme = {
  colors: {
    // Primary amber/peach
    amber: '#C17A3A',
    amberLight: '#E8A860',
    peach: '#D4956A',
    peachLight: '#FAE8DC',
    peachBg: '#F5E6D3',
    cream: '#FDF8F4',
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

// ========== SCENE 1: Logo Intro with Grid (V4 - RESTORED + IMPROVED) ==========
const Scene1_LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoOpacity = interpolate(frame, [0, 25], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const logoScale = interpolate(frame, [0, 30], [0.8, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const gridOpacity = interpolate(frame, [10, 35], [0, 0.5], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${theme.colors.peachLight} 0%, ${theme.colors.peach} 50%, ${theme.colors.amber} 100%)`,
    }}>
      {/* Crosshair grid lines */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: gridOpacity }}>
        {/* Horizontal lines */}
        <line x1="0" y1="33%" x2="100%" y2="33%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="0" y1="67%" x2="100%" y2="67%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        {/* Vertical lines */}
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="10,10" />
      </svg>
      
      {/* 3D Floating F Letter (matching original) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${logoScale})`,
        opacity: logoOpacity,
      }}>
        {/* Shadow for depth */}
        <div style={{
          position: 'absolute',
          fontSize: 140,
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          color: 'transparent',
          textShadow: '4px 4px 12px rgba(0,0,0,0.25)',
        }}>F</div>
        {/* Main 3D F with gradient */}
        <div style={{
          position: 'relative',
          fontSize: 140,
          fontFamily: 'Georgia, serif',
          fontWeight: 400,
          background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(180,140,100,0.6) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>F</div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 2: Logo Reveal with Text Animation ==========
const Scene2_LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const circleScale = interpolate(frame, [0, 30], [0, 3], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const ringOpacity = interpolate(frame, [20, 40], [0, 0.3], {
    extrapolateRight: 'clamp',
  });
  
  // Text reveal - "fehm.ai" appears letter by letter
  const textProgress = interpolate(frame, [25, 55], [0, 7], {
    extrapolateRight: 'clamp',
  });
  
  const text = 'fehm.ai';
  const visibleText = text.slice(0, Math.floor(textProgress));

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${theme.colors.peachLight} 0%, ${theme.colors.peach} 100%)`,
    }}>
      {/* White circle expanding */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${circleScale})`,
        width: 600,
        height: 600,
        borderRadius: '50%',
        backgroundColor: theme.colors.cream,
      }} />
      
      {/* Decorative ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 800,
        borderRadius: '50%',
        border: `2px solid ${theme.colors.peachBg}`,
        opacity: ringOpacity,
      }} />
      
      {/* Logo + Text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        zIndex: 10,
      }}>
        {/* Logo icon */}
        <div style={{
          width: 70,
          height: 70,
          background: `linear-gradient(145deg, ${theme.colors.amberLight} 0%, ${theme.colors.amber} 100%)`,
          borderRadius: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 6px 20px rgba(193, 122, 58, 0.3)',
        }}>
          <span style={{
            fontSize: 42,
            fontFamily: 'Georgia, serif',
            color: 'white',
            fontWeight: 400,
          }}>F</span>
        </div>
        
        {/* Text typing */}
        <span style={{
          fontSize: 52,
          fontFamily: 'Georgia, serif',
          color: theme.colors.amber,
          fontWeight: 400,
        }}>{visibleText}</span>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 3: Language Selection (V4 - WHITE PILL + ARABIC) ==========
const Scene3_LanguageSelect: React.FC = () => {
  const frame = useCurrentFrame();
  
  const textOpacity = interpolate(frame, [0, 25], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const pillOpacity = interpolate(frame, [10, 30], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const pillScale = interpolate(frame, [10, 35], [0.9, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const languageOpacity = interpolate(frame, [25, 45], [0, 1], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: theme.colors.cream }}>
      {/* Layered circular backgrounds (matching original) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        height: 1100,
        borderRadius: '50%',
        backgroundColor: theme.colors.peachLight,
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        height: 900,
        borderRadius: '50%',
        backgroundColor: theme.colors.peachBg,
        opacity: 0.6,
      }} />
      
      {/* Text + Pill */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <span style={{
          fontSize: 48,
          fontFamily: 'Georgia, serif',
          color: theme.colors.amber,
          opacity: textOpacity,
        }}>Select a</span>
        
        {/* WHITE pill with Arabic (matching original) */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: 40,
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          opacity: pillOpacity,
          transform: `scale(${pillScale})`,
        }}>
          {/* Saudi Arabia flag as SVG */}
          <svg width="32" height="22" viewBox="0 0 32 22" style={{ borderRadius: 3 }}>
            <rect width="32" height="22" fill="#006C35"/>
            <text x="16" y="13" fill="white" fontSize="6" fontFamily="Arial" textAnchor="middle">لا إله إلا الله</text>
            <line x1="8" y1="16" x2="24" y2="16" stroke="white" strokeWidth="1"/>
          </svg>
          <span style={{ fontSize: 22, fontFamily: 'Arial', color: theme.colors.textDark, fontWeight: 500 }}>العربية</span>
        </div>
        
        <span style={{
          fontSize: 48,
          fontFamily: 'Georgia, serif',
          color: theme.colors.amber,
          opacity: languageOpacity,
        }}>language</span>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 4: Feature Cards (FIXED - full borders + glow) ==========
const Scene4_FeatureCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const cardsY = interpolate(frame, [0, 25], [80, 0], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const cardsOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const sphereScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  const cardSlide = interpolate(frame, [40, 70], [0, -250], {
    easing: Easing.bezier(0.4, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  // Selected card glow
  const glowOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // SVG Icons as JSX
  const FlashcardsIcon = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="6" y="2" width="16" height="12" rx="2" fill={theme.colors.blue} opacity="0.6"/>
      <rect x="4" y="6" width="16" height="12" rx="2" fill={theme.colors.blue} opacity="0.8"/>
      <rect x="2" y="10" width="16" height="12" rx="2" fill={theme.colors.blue}/>
      <line x1="5" y1="14" x2="15" y2="14" stroke="white" strokeWidth="2"/>
      <line x1="5" y1="18" x2="12" y2="18" stroke="white" strokeWidth="2"/>
    </svg>
  );
  
  const MindmapIcon = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="6" r="4" fill={theme.colors.green}/>
      <circle cx="6" cy="20" r="3" fill={theme.colors.green}/>
      <circle cx="14" cy="22" r="3" fill={theme.colors.green}/>
      <circle cx="22" cy="20" r="3" fill={theme.colors.green}/>
      <line x1="14" y1="10" x2="7" y2="17" stroke={theme.colors.green} strokeWidth="2"/>
      <line x1="14" y1="10" x2="14" y2="19" stroke={theme.colors.green} strokeWidth="2"/>
      <line x1="14" y1="10" x2="21" y2="17" stroke={theme.colors.green} strokeWidth="2"/>
    </svg>
  );
  
  const SummaryIcon = (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="2" width="20" height="24" rx="3" fill={theme.colors.blue} opacity="0.15" stroke={theme.colors.blue} strokeWidth="2"/>
      <line x1="8" y1="8" x2="20" y2="8" stroke={theme.colors.blue} strokeWidth="2"/>
      <line x1="8" y1="13" x2="18" y2="13" stroke={theme.colors.blue} strokeWidth="2"/>
      <line x1="8" y1="18" x2="16" y2="18" stroke={theme.colors.blue} strokeWidth="2"/>
    </svg>
  );

  const cards = [
    { icon: FlashcardsIcon, name: 'Flashcards', subtitle: 'Quick Memorization', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
    { icon: MindmapIcon, name: 'Mindmap', subtitle: 'See how it connects', color: theme.colors.green, borderColor: theme.colors.greenBorder, selected: true },
    { icon: SummaryIcon, name: 'Summary', subtitle: 'Key points extracted', color: theme.colors.blue, borderColor: theme.colors.blueBorder },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: 'white' }}>
      {/* Blue sphere at bottom */}
      <div style={{
        position: 'absolute',
        bottom: -250,
        left: '50%',
        transform: `translateX(-50%) scale(${Math.max(0, sphereScale)})`,
        width: 900,
        height: 500,
        borderRadius: '50%',
        background: 'linear-gradient(180deg, #E8F0FF 0%, #B8D4FF 100%)',
        border: '2px solid #D0E3FF',
      }} />
      
      {/* Cards container */}
      <div style={{
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${cardsY}px) translateX(${cardSlide}px)`,
        display: 'flex',
        gap: 24,
        opacity: cardsOpacity,
      }}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              width: 240,
              height: 160,
            }}
          >
            {/* Glow effect for selected card */}
            {card.selected && (
              <div style={{
                position: 'absolute',
                top: -4,
                left: -4,
                right: -4,
                bottom: -4,
                borderRadius: 24,
                background: `${card.borderColor}40`,
                filter: 'blur(8px)',
                opacity: glowOpacity,
              }} />
            )}
            
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 24,
              border: `3px solid ${card.borderColor}`,
              boxShadow: card.selected 
                ? `0 8px 30px ${card.borderColor}40` 
                : '0 4px 15px rgba(0,0,0,0.06)',
            }}>
              {/* Icon in colored square */}
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: `${card.color}15`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 24,
                marginBottom: 16,
              }}>
                {card.icon}
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: theme.colors.textDark }}>{card.name}</div>
              <div style={{ fontSize: 14, color: theme.colors.gray, marginTop: 4 }}>{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 5: Upload Modal with Folder Drag ==========
const Scene5_UploadModal: React.FC = () => {
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
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>Upload Files</span>
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
            <span style={{ fontSize: 18 }}>+</span> Add
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
          {/* Upload icon */}
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
        {/* Folder shadow */}
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
        {/* Folder */}
        <div style={{
          position: 'relative',
          width: 140,
          height: 110,
          background: 'linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
        }}>
          {/* Folder tab */}
          <div style={{
            position: 'absolute',
            top: -12,
            left: 16,
            width: 50,
            height: 16,
            backgroundColor: '#60A5FA',
            borderRadius: '8px 8px 0 0',
          }} />
          {/* Document lines */}
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
            Studying Material
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

// ========== SCENE 6: File Added + Generate Button ==========
const Scene6_FileAdded: React.FC = () => {
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
  
  // Cursor moves to button
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
      
      {/* Modal with file */}
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
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>Upload Files</span>
          <div style={{
            backgroundColor: theme.colors.blue,
            color: 'white',
            padding: '10px 22px',
            borderRadius: 24,
            fontSize: 15,
            fontWeight: 500,
          }}>+ Add</div>
        </div>
        
        {/* Dashed area with file */}
        <div style={{
          border: '2px dashed #D1D5DB',
          borderRadius: 16,
          padding: 40,
        }}>
          {/* File entry */}
          <div style={{
            backgroundColor: theme.colors.blueLight,
            borderRadius: 12,
            padding: '16px 24px',
            opacity: fileOpacity,
          }}>
            <span style={{ color: theme.colors.textDark, fontSize: 17, fontWeight: 500 }}>Space_Study_Guide</span>
          </div>
        </div>
      </div>
      
      {/* Generate button */}
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
        <span style={{ fontSize: 20 }}>✨</span> Generate Flashcards
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

// ========== SCENE 7: Flashcards Grid ==========
const Scene7_FlashcardsGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const questions = [
    'When did the Universe begin?',
    'What does the Universe contain?',
    'How wide is the observable universe?',
    'Who was the first human in space?',
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
      
      {/* Study button */}
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
        boxShadow: '0 8px 25px rgba(193, 122, 58, 0.4)',
        opacity: buttonOpacity,
        zIndex: 10,
      }}>
        <span>▶</span> Study
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 8: Single Flashcard Question (NEW) ==========
const Scene8_FlashcardQuestion: React.FC = () => {
  const frame = useCurrentFrame();
  
  const cardScale = interpolate(frame, [0, 20], [0.9, 1], {
    easing: Easing.bezier(0, 0, 0.2, 1),
    extrapolateRight: 'clamp',
  });
  
  const cardOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  // Typing effect for question
  const fullQuestion = 'When did the Universe begin?';
  const typingProgress = interpolate(frame, [20, 55], [0, fullQuestion.length], {
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
        }}>QUESTION</div>
        
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
        }}>Tap to flip</div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 9: Flashcard Answer with Anki Buttons ==========
const Scene9_FlashcardAnswer: React.FC = () => {
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
    { label: 'Easy', color: theme.colors.pink, bgColor: theme.colors.pinkLight, emoji: '😟' },
    { label: 'Hard', color: theme.colors.yellow, bgColor: theme.colors.yellowLight, emoji: '😐' },
    { label: 'Good', color: theme.colors.green, bgColor: theme.colors.greenLight, emoji: '🙂' },
    { label: 'Easy', color: theme.colors.blue, bgColor: theme.colors.blueLight, emoji: '😊' },
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
        }}>ANSWER</div>
        
        <div style={{ 
          fontSize: 26, 
          color: theme.colors.textDark, 
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          The Universe began about 13.8 billion years ago with the Big Bang.
        </div>
        
        <div style={{ 
          color: theme.colors.green, 
          fontSize: 14, 
          marginTop: 30,
          textAlign: 'center',
        }}>Tap to flip</div>
      </div>
      
      {/* Anki-style buttons */}
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

// ========== SCENE 10: Study with Voice Card (V3 - FILLED SHAPES) ==========
const Scene10_StudyVoiceCard: React.FC = () => {
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
  
  // Cursor appears and moves to button
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
      {/* Filled rounded rectangle shapes (matching original) */}
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
      
      {/* Study with voice card */}
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
        {/* Header with icon */}
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
          <span style={{ fontSize: 22, fontWeight: 600, color: theme.colors.textDark }}>Study with voice</span>
        </div>
        
        {/* Start a call button */}
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
          boxShadow: '0 6px 20px rgba(193, 122, 58, 0.35)',
        }}>
          <span style={{ fontSize: 20 }}>🎤</span> Start a call
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

// ========== SCENE 11: Voice Call UI (V3 - FILLED SHAPES + BETTER PINWHEEL) ==========
const Scene11_VoiceCall: React.FC = () => {
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
  
  // "Hey there" text animation
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
      {/* Filled rounded rectangle shapes (matching original) */}
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
      
      {/* "Hey there" text - LEFT side */}
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
        }}>Hey</div>
        <div style={{ 
          fontSize: 72, 
          fontFamily: 'Georgia, serif', 
          color: theme.colors.peach, 
          fontWeight: 400,
          opacity: thereOpacity,
        }}>there</div>
      </div>
      
      {/* "I'm" text - RIGHT side (matching original) */}
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
        }}>I'm</div>
      </div>
      
      {/* Voice call modal - CENTERED */}
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
        <div style={{ fontSize: 16, color: theme.colors.gray, marginBottom: 24 }}>Space Study Guide</div>
        
        {/* 5-petal flower pinwheel (matching original) */}
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
          Speaking...
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
          }}>US</div>
          <div style={{
            backgroundColor: theme.colors.grayLight,
            padding: '12px 16px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.colors.textDark} strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </div>
          <div style={{
            backgroundColor: theme.colors.red,
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
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            End
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== SCENE 12: Final Logo ==========
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
            boxShadow: '0 8px 30px rgba(193, 122, 58, 0.35)',
          }}>
            <span style={{
              fontSize: 48,
              fontFamily: 'Georgia, serif',
              color: 'white',
              fontWeight: 400,
            }}>F</span>
          </div>
          
          {/* Logo text */}
          <span style={{
            fontSize: 64,
            fontFamily: 'Georgia, serif',
            color: theme.colors.amber,
          }}>fehm.ai</span>
        </div>
        
        {/* Subtitle */}
        <div style={{
          fontSize: 26,
          color: theme.colors.amber,
          opacity: subtitleOpacity,
          fontFamily: 'Georgia, serif',
        }}>
          Your Study Companion
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ========== MAIN VIDEO (UPDATED - 35 seconds @ 30fps = 1050 frames) ==========
export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Audio */}
      <Audio src={staticFile('audio.mp3')} />
      
      {/* Scene 1: Logo Intro (0-2s) */}
      <Sequence from={0} durationInFrames={60}>
        <Scene1_LogoIntro />
      </Sequence>
      
      {/* Scene 2: Logo Reveal with text (2-4.5s) */}
      <Sequence from={60} durationInFrames={75}>
        <Scene2_LogoReveal />
      </Sequence>
      
      {/* Scene 3: Language Selection (4.5-7s) */}
      <Sequence from={135} durationInFrames={75}>
        <Scene3_LanguageSelect />
      </Sequence>
      
      {/* Scene 4: Feature Cards (7-10s) */}
      <Sequence from={210} durationInFrames={90}>
        <Scene4_FeatureCards />
      </Sequence>
      
      {/* Scene 5: Upload Modal with drag (10-13s) */}
      <Sequence from={300} durationInFrames={90}>
        <Scene5_UploadModal />
      </Sequence>
      
      {/* Scene 6: File Added + Generate (13-16s) */}
      <Sequence from={390} durationInFrames={90}>
        <Scene6_FileAdded />
      </Sequence>
      
      {/* Scene 7: Flashcards Grid (16-19s) */}
      <Sequence from={480} durationInFrames={90}>
        <Scene7_FlashcardsGrid />
      </Sequence>
      
      {/* Scene 8: Question Card (19-22s) */}
      <Sequence from={570} durationInFrames={90}>
        <Scene8_FlashcardQuestion />
      </Sequence>
      
      {/* Scene 9: Answer + Anki Buttons (22-25s) */}
      <Sequence from={660} durationInFrames={90}>
        <Scene9_FlashcardAnswer />
      </Sequence>
      
      {/* Scene 10: Study with Voice Card (25-28s) */}
      <Sequence from={750} durationInFrames={90}>
        <Scene10_StudyVoiceCard />
      </Sequence>
      
      {/* Scene 11: Voice Call UI (28-32s) */}
      <Sequence from={840} durationInFrames={120}>
        <Scene11_VoiceCall />
      </Sequence>
      
      {/* Scene 12: Final Logo (32-35s) */}
      <Sequence from={960} durationInFrames={90}>
        <Scene12_FinalLogo />
      </Sequence>
    </AbsoluteFill>
  );
};
