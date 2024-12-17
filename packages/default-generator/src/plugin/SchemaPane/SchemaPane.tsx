import { useState } from 'react';
import { useEngineStore } from '@lowcode-engine/model';
import { Button, Drawer } from 'antd';
import { MonacoEditor } from '@lowcode-engine/monaco-editor';

export default function SchemaPane() {
  const [active, setActive] = useState(false);
  const schema = useEngineStore((state) => state.schema);
  const handleOpen = () => {
    setActive(!active);
  };

  return (
    <div>
      <Button type={'text'} onClick={handleOpen}>
        当前页面配置
      </Button>
      <Drawer
        open={active}
        placement={'left'}
        onClose={handleOpen}
        closable={false}
      >
        <div>
          <MonacoEditor
            value={JSON.stringify(schema, undefined, 2)}
            language={'JSON'}
          />
        </div>
      </Drawer>
    </div>
  );
}
