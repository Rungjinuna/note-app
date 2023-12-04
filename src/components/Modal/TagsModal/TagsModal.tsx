import React, { FC, useState } from 'react';
import { Tag } from '../../../types/tag';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import { Box, StyledInput, TagsBox } from './TagsModal.styles';
import { FaMinus, FaPlus, FaTimes } from 'react-icons/fa';
import { toggleTagsModal } from '../../../store/modal/modalSlice';
import { v4 } from 'uuid';
import { addTags, deleteTags } from '../../../store/tags/tagsSlice';
import getStandardName from '../../../utils/getStandardName';
import { removeTags } from '../../../store/noteList/noteListSlice';

interface TagsModalProps {
  type: string;
  addedTags?: Tag[];
  handleTags?: (tag: string, type: string) => void;
}

const TagsModal: FC<TagsModalProps> = ({ type, addedTags, handleTags }) => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState('');
  const { tagsList } = useAppSelector((state) => state.tags);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) {
      return;
    }
    dispatch(addTags({ tag: inputText.toLowerCase(), id: v4() }));
    setInputText('');
  };

  const deleteTagsHandler = (tag: string, id: string) => {
    dispatch(deleteTags(id));
    dispatch(removeTags({ tag }));
  };

  return (
    <FixedContainer>
      <Box>
        <div className='editTags__header'>
          <div className='editTags__title'>
            {type === 'add' ? 'Add' : 'Edit'} Tags
          </div>
          <DeleteBox
            className='editTags__close'
            onClick={() => dispatch(toggleTagsModal({ type, view: false }))}
          >
            <FaTimes />
          </DeleteBox>
        </div>
        <form onSubmit={submitHandler}>
          <StyledInput
            type='text'
            value={inputText}
            placeholder='New Tag ..'
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <TagsBox>
          {tagsList.map(({ tag, id }) => (
            <li key={id}>
              <div className='editTags__tag'>{getStandardName(tag)}</div>
              {/* type이 edit인 경우 각 태그 옆에는 삭제아이콘이 표시됨, 삭제아이콘은 함수호출하여 해당태그 삭제
              type이 edit이 아닌경우 추가 또는 제거 아이콘 보여줌
              사용자가 이미 추가한 태그인지 확인하기 위해 addedTags배열과 비교 */}
              {type === 'edit' ? (
                <DeleteBox onClick={() => deleteTagsHandler(tag, id)}>
                  <FaTimes />
                </DeleteBox>
              ) : (
                <DeleteBox>
                  {addedTags?.find(
                    (addedTag: Tag) => addedTag.tag === tag.toLowerCase()
                  ) ? (
                    // TypeScript의 "non-null assertion operator"
                    // handleTags가 null이나 undefined가 아님을 단언
                    <FaMinus onClick={() => handleTags!(tag, 'remove')} />
                  ) : (
                    <FaPlus onClick={() => handleTags!(tag, 'add')} />
                  )}
                </DeleteBox>
              )}
            </li>
          ))}
        </TagsBox>
      </Box>
    </FixedContainer>
  );
};

export default TagsModal;
