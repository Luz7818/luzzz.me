'use client';

import { motion, useReducedMotion } from 'motion/react';

const EASE = [0.23, 1, 0.32, 1] as const;

type Props = {
  text: string;
  /** 每个字符(运动元素)上的类:渐变裁切、字重等;字号/颜色写在 wrapperClassName 让遮罩的 em 同步 */
  charClassName?: string;
  wrapperClassName?: string;
  /** 首字符延迟(秒) */
  delay?: number;
  /** 相邻字符错峰间隔(秒) */
  stagger?: number;
  /** 单字符时长(秒) */
  duration?: number;
  /** 进入视口只演一次 */
  once?: boolean;
};

/**
 * 逐字错峰入场:每个字符从自己的遮罩里自下而上升起。
 * 触发统一走 whileInView(挂载即可见时等价于进场即播);
 * 环形轮播切换项目时用 key 重挂载实现重演。
 * DOM 结构与服务端渲染恒定(拆字),减弱动效只经 Motion props 关闭位移,
 * 否则 useReducedMotion 在客户端首帧与 SSR 不一致会造成 hydration 文本不匹配。
 */
export default function SplitChars({
  text,
  charClassName = '',
  wrapperClassName = '',
  delay = 0,
  stagger = 0.035,
  duration = 0.55,
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const chars = Array.from(text);

  return (
    <motion.span
      className={wrapperClassName}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'show'}
      viewport={reduce ? undefined : { once, amount: 0.5 }}
      variants={reduce ? undefined : { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {chars.map((ch, i) => (
        <span
          key={`${i}-${ch}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${charClassName}`}
            variants={
              reduce
                ? undefined
                : {
                    hidden: { y: '112%' },
                    show: { y: '0%', transition: { duration, ease: EASE } },
                  }
            }
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
