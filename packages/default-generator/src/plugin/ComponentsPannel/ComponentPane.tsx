import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useMaterialStore } from '@lowcode-engine/model';
import { Popover } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { ComponentGroup } from './DraggableComponent';

interface ComponentItem {
  componentName: string;
  iconUrl: string;
  packageName: string;
  title: string;
}
export default function ComponentPane() {
  const [active, setActive] = useState(false);
  const [components, setComponents] = useState<{
    layoutComponent: ComponentItem[];
    baseComponent: ComponentItem[];
    subjoinComponent: ComponentItem[];
    templates: ComponentItem[];
  }>({
    layoutComponent: [],
    baseComponent: [],
    subjoinComponent: [],
    templates: [],
  });
  const componentSpecMap = useMaterialStore((state) => state.componentSpecMap);

  useEffect(() => {
    const newComponents: {
      layoutComponent: ComponentItem[];
      baseComponent: ComponentItem[];
      subjoinComponent: ComponentItem[];
      templates: ComponentItem[];
    } = {
      layoutComponent: [],
      baseComponent: [],
      subjoinComponent: [],
      templates: [],
    };

    componentSpecMap.forEach((spec, packageName) => {
      const item = {
        componentName: spec.componentName,
        iconUrl: spec.iconUrl,
        packageName: packageName,
        title: spec.title,
      };
      switch (spec.group) {
        case 'layout':
          newComponents.layoutComponent.push(item);
          break;
        case 'base':
          newComponents.baseComponent.push(item);
          break;
        case 'subjoin':
          newComponents.subjoinComponent.push(item);
          break;
        case 'template':
          newComponents.templates.push(item);
          break;
      }
      setComponents(newComponents);
    });
  }, [componentSpecMap]);
  return (
    <div>
      组件
      <DndProvider backend={HTML5Backend}>
        <div className={'component-pane'}>
          <Popover
            trigger="click"
            placement="rightTop"
            open={active}
            onOpenChange={() => setActive(!active)}
            content={
              <div className="components-pane-body pane-body">
                <ComponentGroup
                  title="模板"
                  components={components.templates}
                />
                <ComponentGroup
                  title="布局组件"
                  components={components.layoutComponent}
                />
                <ComponentGroup
                  title="基础组件"
                  components={components.baseComponent}
                />
                <ComponentGroup
                  title="高级组件"
                  components={components.subjoinComponent}
                />
              </div>
            }
          >
            <AppstoreOutlined
            // className={cn({ icon: true, active: isActive })}
            />
          </Popover>
        </div>
      </DndProvider>
    </div>
  );
}
