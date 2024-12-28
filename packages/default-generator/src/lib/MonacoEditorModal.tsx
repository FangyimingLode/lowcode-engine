import { Button, Modal } from 'antd';
import { MonacoEditor } from '@lowcode-engine/monaco-editor';
import { useState } from 'react';

interface MonacoEditorProps {
  isOpen?: boolean;
  title: string;
  value: string;
  onChange: (value: string) => void;
  language: string;
}
export function MonacoEditorModal({
  isOpen,
  title,
  language,
  value,
  onChange,
}: MonacoEditorProps) {
  const [open, setOpen] = useState(isOpen || false);
  console.log(value, 'value', value);
  return (
    <Modal
      open={open}
      width={800}
      title={title}
      footer={[
        <Button key="back" onClick={() => setOpen(false)}>
          最小化
        </Button>,
      ]}
      onCancel={() => setOpen(false)}
    >
      <MonacoEditor onChange={onChange} value={value} language={language} options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fontSize: 14
      }} />
    </Modal>
  );
}
