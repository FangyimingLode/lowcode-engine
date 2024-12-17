import { useSkeletonStore } from '@lowcode-engine/model';
import { css } from '@emotion/react';
export default function LeftArea() {
  const items = useSkeletonStore((state) => state.areas.left.items);
  console.log(items, 'leftArea');
  if (items.length === 0) return null;
  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
        width: 50px;
        background-color: #fff;
        border-right: 1px solid rgba(0, 0, 0, 0.06);
        text-align: center;
        color: #1890ff;
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
