
"use client"

import React from 'react';

/**
 * GameIcon component - A high-quality SVG representation of the Color Dash Blitz icon.
 * This can be used as a logo within the app or exported as a 512x512 PNG for store listings.
 */
export default function GameIcon({ size = 512 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center p-4 bg-muted rounded-3xl">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shadow-2xl rounded-[128px]"
      >
        {/* Main Gradient Background */}
        <rect width="512" height="512" rx="128" fill="url(#icon_gradient)" />
        
        {/* Background Decorative "Color Blurs" */}
        <circle cx="100" cy="100" r="60" fill="#FFD700" fillOpacity="0.3" />
        <circle cx="412" cy="412" r="80" fill="#00FFFF" fillOpacity="0.2" />
        <circle cx="412" cy="100" r="50" fill="#00FF00" fillOpacity="0.2" />
        <circle cx="100" cy="412" r="70" fill="#FF00FF" fillOpacity="0.2" />
        
        {/* Stylized Lightning Bolt (The Blitz) */}
        <path 
          d="M280 60L120 280H240L232 452L392 232H272L280 60Z" 
          fill="white" 
          stroke="white" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Subtle Inner Glow */}
        <path 
          d="M280 60L120 280H240L232 452L392 232H272L280 60Z" 
          fill="white" 
          fillOpacity="0.2" 
          filter="url(#glow)"
        />

        <defs>
          <linearGradient id="icon_gradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF4B4B" /> {/* Game Primary Red */}
            <stop offset="1" stopColor="#D81B60" /> {/* Game Secondary Pink */}
          </linearGradient>
          
          <filter id="glow" x="0" y="0" width="512" height="512" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
