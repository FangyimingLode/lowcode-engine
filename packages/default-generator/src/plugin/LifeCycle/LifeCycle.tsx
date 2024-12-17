import { useEngineStore } from '@lowcode-engine/model';
import { useState } from 'react';
import { LifeCycles } from '@lowcode-engine/types';
import { Button, Drawer } from 'antd';
import { MonacoEditor } from '@lowcode-engine/monaco-editor';

export default function LifeCycle() {
  // const { lifeCycles, updateLifeCycle} = useLifeCycles()
  const lifeCycles = useEngineStore((state) => state.schema.lifeCycle);
  const updateLifeCycle = useEngineStore((state) => state.updateLifeCycle);
  const [active, setActive] = useState(false);

  const handleOpen = () => {
    setActive(!active);
  };

  const handleChange = (name: keyof LifeCycles) => (value: string) => {
    updateLifeCycle(name, {
      type: 'JSFunction',
      value: value,
    });
  };

  const handleAddLifeCycle = (name: keyof LifeCycles) => () => {
    updateLifeCycle(name, {
      type: 'JSFunction',
      value: `function on${name}() {/** todo **/}`,
    });
  };

  return (
    <div>
      <Button type={'text'} onClick={handleOpen}>
        声明周期函数
      </Button>
      <Drawer
        open={active}
        placement={'right'}
        onClose={handleOpen}
        closable={false}
      >
        <div>
          <div>应用加载之后</div>
          {lifeCycles.load !== undefined ? (
            <MonacoEditor
              value={lifeCycles.load.value}
              language={'javascript'}
              onBlur={handleChange('load')}
            />
          ) : (
            <Button
              type={'dashed'}
              size={'small'}
              onClick={handleAddLifeCycle('load')}
            >
              添加
            </Button>
          )}
        </div>
        <div>
          <div>应用卸载之前</div>
          {lifeCycles.beforeunload !== undefined ? (
            <MonacoEditor
              value={lifeCycles.beforeunload.value}
              language={'javascript'}
              onBlur={handleChange('beforeunload')}
            />
          ) : (
            <Button
              type={'dashed'}
              size={'small'}
              onClick={handleAddLifeCycle('beforeunload')}
            >
              添加
            </Button>
          )}
        </div>
        <div>
          <div>应用可见性变更时</div>
          {lifeCycles.visibilitychange !== undefined ? (
            <MonacoEditor
              value={lifeCycles.visibilitychange.value}
              language={'javascript'}
              onBlur={handleChange('visibilitychange')}
            />
          ) : (
            <Button
              type={'dashed'}
              size={'small'}
              onClick={handleAddLifeCycle('visibilitychange')}
            >
              添加
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
}
