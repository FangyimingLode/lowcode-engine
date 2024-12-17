import { useState } from 'react';
import { useEngineStore } from '@lowcode-engine/model';


interface ComponentItem {
  componentName: string;
  iconUrl: string;
  packageName: string;
  title: string;
}
export default function ComponentPane(){
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState(0)
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
  })

  return (
    <div>组件</div>
  )
}
