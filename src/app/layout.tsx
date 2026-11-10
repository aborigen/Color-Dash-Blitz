
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { CURRENT_PLATFORM } from '@/lib/platform-sdk';

export const metadata: Metadata = {
  title: 'Color Dash Blitz',
  description: 'A fast-paced color matching hyper-casual game.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        {/* Platform SDK Script Injection */}
        {CURRENT_PLATFORM === 'YANDEX' && (
          <Script 
            src="https://yandex.ru/games/sdk/v2" 
            strategy="beforeInteractive" 
          />
        )}
        {CURRENT_PLATFORM === 'VK' && (
          <Script 
            src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js" 
            strategy="beforeInteractive" 
          />
        )}
        {CURRENT_PLATFORM === 'SBER' && (
          <Script 
            src="https://assistant.sberdevices.ru/sdks/canvas-app-sdk/v1/canvas-app-sdk.js" 
            strategy="beforeInteractive" 
          />
        )}
        {children}
      </body>
    </html>
  );
}
