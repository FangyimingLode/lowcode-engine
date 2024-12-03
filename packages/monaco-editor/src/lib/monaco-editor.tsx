import styled from '@emotion/styled';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { useRef } from 'react';
const StyledMonacoEditor = styled.div`
  color: pink;
`;

interface MonacoEditorProps {
  onChange: (value: string) => void;
}
type IStandaloneCodeEditor = Parameters<OnMount>[0];
export function MonacoEditor({ onChange }: MonacoEditorProps) {
  const editorRef = useRef<IStandaloneCodeEditor>();
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  const handleChange: OnChange = (value) => {
    value && onChange(value);
  };
  return (
    <StyledMonacoEditor>
      <h1>Welcome to MonacoEditor!</h1>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
        onChange={handleChange}
      />
      ;
    </StyledMonacoEditor>
  );
}

export default MonacoEditor;
