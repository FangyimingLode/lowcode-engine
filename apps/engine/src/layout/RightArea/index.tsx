import { useSkeletonStore } from '@lowcode-engine/model';
import { css } from '@emotion/react'
export default function RightArea() {
  const items = useSkeletonStore(state => state.areas.topRight.items)
  if(items.length === 0) return null;
  return (
    <div
      css={css`
        position: absolute;
        display: flex;
        left: 0;
        right: 0;
        bottom: 0;
        height: 50px;
        justify-content: center;
        align-items: center;
      `}
    >
      {items.map((item) => (
        <div key={item.name}>{item.content}</div>
      ))}
    </div>
  );
}
