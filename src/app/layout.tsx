import type { Metadata, Viewport } from 'next';
import './globals.css';
import { profile } from '@/data/site';

export const metadata: Metadata = {
  title: `${profile.fullName} ${profile.displayName} · ${profile.kicker}`,
  description: profile.lead,
  authors: [{ name: profile.latinName, url: profile.github }],
  openGraph: {
    title: `${profile.fullName} ${profile.displayName} · ${profile.kicker}`,
    description: profile.lead,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a1016' },
    { media: '(prefers-color-scheme: light)', color: '#f2f5f9' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/** 首屏前定主题:localStorage 优先,首次访问跟随系统,默认暗色。避免亮暗白闪。 */
const themeBoot = `(function(){try{var t=localStorage.getItem('luzzz-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        {children}
      </body>
    </html>
  );
}
