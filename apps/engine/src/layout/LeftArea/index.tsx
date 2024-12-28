import { useSkeletonStore } from '@lowcode-engine/model';
import { css } from '@emotion/react';
export default function LeftArea() {
  const items = useSkeletonStore((state) => state.areas.left.items);
  console.log(items, 'leftArea');
  if (items.length === 0) return null;
  return (
    <div
      css={css`
        border-right: 1px solid rgba(0, 0, 0, 0.06);
        text-align: center;
        padding-top: 20px;
      `}
    >
      {items.map((item) => (
        <div className="item" key={item.name}>
          {item.content}
        </div>
      ))}
    </div>
  );
}
