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
    { media: '(prefers-color-scheme: light)', color: '#eef2f7' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/** 首屏前定主题:localStorage 优先,首次访问跟随系统,默认暗色。避免亮暗白闪。
 * 顺带落一个无 media 的 theme-color meta:带 media 的两枚只服务无 JS 兜底,
 * 无 media 的始终生效且排在最后,手动切主题后手机地址栏颜色才能跟手。 */
const themeBoot = `(function(){try{var t=localStorage.getItem('luzzz-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]:not([media])');if(!m){m=document.createElement('meta');m.setAttribute('name','theme-color');document.head.appendChild(m)}m.setAttribute('content',t==='light'?'#eef2f7':'#0a1016')}catch(e){document.documentElement.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        {/* 字体预加载:首屏不再先渲染系统字体再闪换成 Overpass(React 19 会把 link 提升到 head) */}
        <link rel="preload" href="/fonts/overpass-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="/fonts/jetbrains-mono-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        {children}
      </body>
    </html>
  );
}
