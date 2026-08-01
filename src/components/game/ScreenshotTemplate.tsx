
"use client"

import React from 'react';
import { Zap, Trophy, Info } from 'lucide-react';

/**
 * ScreenshotTemplate component - Helps generate 16:9 landscape screenshots.
 * Can be rendered in a hidden route or developer tool to export assets.
 */
export default function ScreenshotTemplate({ 
  type = 'GAMEPLAY', 
  lang = 'en' 
}: { 
  type?: 'START' | 'GAMEPLAY' | 'GAMEOVER';
  lang?: 'en' | 'ru';
}) {
  const content = {
    en: {
      headline: type === 'START' ? 'BLITZ CHALLENGE' : type === 'GAMEPLAY' ? 'MATCH THE COLOR!' : 'GET THE HIGH SCORE',
      subline: type === 'START' ? 'Test your reflexes now' : type === 'GAMEPLAY' ? 'Stay sharp, speed increases' : 'Learn amazing color facts',
    },
    ru: {
      headline: type === 'START' ? 'БЛИЦ ВЫЗОВ' : type === 'GAMEPLAY' ? 'НАЙДИ ЦВЕТ!' : 'БЕЙ РЕКОРДЫ',
      subline: type === 'START' ? 'Проверь свою реакцию' : type === 'GAMEPLAY' ? 'Будь быстрее, время идет' : 'Узнавай факты о цветах',
    }
  }[lang];

  return (
    <div className="w-[1280px] h-[720px] bg-background relative overflow-hidden flex flex-col items-center justify-center font-sans p-12">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[150px] -z-10" />
      
      {/* Content Frame */}
      <div className="w-full h-full border-[12px] border-white/50 rounded-[4rem] flex flex-col items-center justify-between p-12 shadow-2xl bg-white/10 backdrop-blur-sm relative">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-7xl font-black text-foreground uppercase tracking-tight leading-none italic">
            {content.headline}
          </h1>
          <p className="text-2xl font-bold text-muted-foreground uppercase tracking-[0.3em]">
            {content.subline}
          </p>
        </div>

        {/* Central Visual (Mockup of Game Logic) */}
        <div className="flex-1 flex items-center justify-center w-full gap-12">
          {type === 'START' && (
            <div className="flex flex-col items-center animate-bounce">
              <div className="w-48 h-48 bg-primary rounded-[3rem] shadow-2xl flex items-center justify-center mb-6">
                <Zap size={100} color="white" fill="white" />
              </div>
            </div>
          )}

          {type === 'GAMEPLAY' && (
            <div className="flex gap-8 items-center">
              <div className="w-48 h-48 bg-[#FF00FF] rounded-[3rem] border-8 border-white shadow-xl" />
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`w-20 h-20 rounded-2xl shadow-md ${i===2 ? 'bg-[#FF00FF] border-4 border-white' : 'bg-muted'}`} />
                ))}
              </div>
            </div>
          )}

          {type === 'GAMEOVER' && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 bg-white/80 p-6 rounded-3xl shadow-lg border-2 border-primary">
                <Trophy size={48} className="text-secondary" />
                <span className="text-8xl font-black text-primary">42</span>
              </div>
              <div className="max-w-xl bg-white/50 p-6 rounded-2xl border border-white text-center">
                <div className="flex items-center justify-center gap-2 mb-2 text-secondary font-black text-xs tracking-widest uppercase">
                  <Info size={16} /> Color Fact
                </div>
                <p className="text-xl font-medium italic opacity-80 italic">"Blue is the most popular favorite color worldwide."</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Brand */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Zap size={24} color="white" fill="white" />
          </div>
          <span className="text-3xl font-black uppercase tracking-tighter">Color Dash <span className="text-secondary">Blitz</span></span>
        </div>
      </div>
    </div>
  );
}
