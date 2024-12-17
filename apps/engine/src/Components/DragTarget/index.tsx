import type { FC } from 'react';
import { useEngineStore } from '@lowcode-engine/model';
import { useDrop } from 'react-dnd';

interface DrageTargetProps {
  nodeId: string;
  position: 'before' | 'after'| 'inner';
}
export const DragTarget: FC<DrageTargetProps> = ({nodeId, position}) => {
  const {insertNode } = useEngineStore()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'COMPONENT',
    drop: (item: { type: string, packageName: string}) => {
      insertNode({
        targetId: nodeId,
        position,
        packageName: item.packageName
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  return (
    <div ref={drop} className={`drag-target ${position} ${isOver ? 'active': ''}`} />
  )
}
