import { useRef, useState } from 'react';
import { useEngineStore } from '@lowcode-engine/model';
import { Button, Drawer } from 'antd';
import { MonacoEditor } from '@lowcode-engine/monaco-editor';
import { css } from '@emotion/react';

export default function SchemaPane() {
  const [active, setActive] = useState(false);
  const schema = useEngineStore((state) => state.getSchema);
  console.log(schema, 'schema')
  const handleOpen = () => {
    setActive(!active);
  };
  console.log('document.getElementById(\'content\')', document.getElementById('content'))
  return (
    <div css={css`
      position: relative;
    `}
    >

      <Button type={'text'} onClick={handleOpen}>
        当前页面配置
      </Button>
      <Drawer
        open={active}
        placement={'left'}
        onClose={handleOpen}
        closable={false}
        destroyOnClose
        width={'50%'}
        mask={true}
        rootStyle={{ position: "absolute" }}
        getContainer={document.getElementById('content') || false}
      >
        <div>
          <MonacoEditor
            value={JSON.stringify(schema(), undefined, 2)}
            language={'JSON'}
          />
        </div>
      </Drawer>
    </div>
  );
}
