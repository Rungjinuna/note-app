import React, { FC } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

interface TextEditorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  color: string;
}

const TextEditor: FC<TextEditorProps> = ({ value, setValue, color }) => {
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'color',
    'background',
    'image',
    'blockquote',
    'code-block',
  ];
  // 모듈객체는 편집기의 도구모음과 관련된 설정 정의
  // 빈 배열은 도구 그룹 사이의 공간
  const modules = {
    toolbar: [
      [{ list: 'ordered' }, { list: 'bullet' }],
      [],
      ['bold', 'italic', 'underline', 'strike'],
      [],
      [{ color: [] }, { background: [] }],
      [],
      ['image', 'blockquote', 'code-block'],
    ],
  };

  return (
    <Container noteColor={color}>
      <ReactQuill
        formats={formats}
        modules={modules}
        value={value}
        onChange={setValue}
      />
    </Container>
  );
};

export default TextEditor;

const Container = styled.div<{ noteColor: string }>`
  .ql-editor {
    height: 200px;
    background-color: ${({ noteColor }) => noteColor};
  }
`;
