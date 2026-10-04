/** 氛围层:三团极光辉光缓慢漂移 + 一层颗粒。固定定位、不拦截指针,滚动时零重绘。
 * 经典布局垫底(-z-10);三幕布局传 className 提到流体层之上、内容之下(z-[1])。 */
export default function Aurora({
  className = 'pointer-events-none fixed inset-0 -z-10 overflow-hidden',
}: {
  className?: string;
}) {
  return (
    <div aria-hidden className={className}>
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="aurora aurora-4" />
      <div className="grain" />
    </div>
  );
}
