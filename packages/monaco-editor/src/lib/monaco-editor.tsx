import styled from '@emotion/styled';
import Editor, { OnMount, OnChange } from '@monaco-editor/react';
import { useEffect, useRef } from 'react';

const StyledMonacoEditor = styled.div`
  color: pink;
`;

interface MonacoEditorProps {
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  value?: string;
  language?: string;
}
type IStandaloneCodeEditor = Parameters<OnMount>[0];

export function MonacoEditor({ onChange, onBlur, value }: MonacoEditorProps) {
  const editorRef = useRef<IStandaloneCodeEditor>();
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };
  const handleChange: OnChange = (value) => {
    value && onChange && onChange(value);
  };
  console.log(value, 'value')
  useEffect(() => {
    if(editorRef.current) {
      editorRef.current.onDidBlurEditorText(() => {
        editorRef.current && onBlur && onBlur(editorRef.current.getValue());
      });
    }

  }, [editorRef, onBlur]);

  return (
    <StyledMonacoEditor>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue={value}
        onMount={handleEditorDidMount}
        onChange={handleChange}
      />

    </StyledMonacoEditor>
  );
}
