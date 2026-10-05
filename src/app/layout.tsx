import type {Metadata} from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
