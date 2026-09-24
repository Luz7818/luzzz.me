import type { Metadata, Viewport } from 'next';
import './globals.css';
import { profile } from '@/data/site';

export const metadata: Metadata = {
  title: `${profile.displayName} — Portfolio`,
  description: profile.lead,
  authors: [{ name: profile.fullName, url: profile.github }],
  openGraph: {
    title: `${profile.displayName} — Portfolio`,
    description: profile.lead,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f5f7fc',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen font-mono">{c