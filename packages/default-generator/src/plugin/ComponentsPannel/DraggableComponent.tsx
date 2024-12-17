import { useDrag } from 'react-dnd';
import { FC } from 'react';

interface IProps {
  componentName: string;
  iconUrl: string;
  packageName: string;
  title: string;
}
export const DraggableComponent: FC<IProps> = ({
  packageName,
  title,
  iconUrl,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COMPONENT',
    item: { type: 'COMPONENT', packageName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag} className={`component ${isDragging ? 'dragging' : ''}`}>
      <img src={iconUrl} draggable={false} className={'img'} alt={''} />
      <div className={'name'}>{title}</div>
    </div>
  );
};

export const ComponentGroup = ({
  title,
  components,
}: {
  title: string;
  components: IProps[];
}) => {
  if (components.length === 0 || !components.length) return null;
  return (
    <div className={'component-group'}>
      <div className={'title'}>{title}</div>
      <div className={'body'}>
        {components.map((item) => (
          <DraggableComponent key={item.packageName} {...item} />
        ))}
      </div>
    </div>
  );
};
