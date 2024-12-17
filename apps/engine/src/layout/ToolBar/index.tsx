import { useSkeletonStore } from '@lowcode-engine/model';

export default function ToolBar() {
  const items = useSkeletonStore(state => state.areas.toolBar.items)
  if(items.length === 0) return null
  return (
    <div>
      {items.map((item) => (
        <div>{item.content}</div>
      ))}
    </div>
  )
}
