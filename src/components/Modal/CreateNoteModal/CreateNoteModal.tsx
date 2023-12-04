import React, { useState } from 'react';
import { DeleteBox, FixedContainer } from '../Modal.styles';
import {
  AddedTagsBox,
  Box,
  OptionsBox,
  StyledInput,
  TopBox,
} from './CreateNoteModal.styles';
import { FaPlus, FaTimes } from 'react-icons/fa';
import {
  toggleCreateNoteModal,
  toggleTagsModal,
} from '../../../store/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  setEditNote,
  setMainNotes,
} from '../../../store/noteList/noteListSlice';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';
import { TagsModal } from '../..';
import { v4 } from 'uuid';
import TextEditor from '../../TextEditor/TextEditor';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { Note } from '../../../types/note';

const CreateNoteModal = () => {
  const dispatch = useAppDispatch();
  const { editNote } = useAppSelector((state) => state.notesList);
  const { viewAddTagsModal } = useAppSelector((state) => state.modal);

  const [noteTitle, setNoteTitle] = useState(editNote?.title || '');
  const [value, setValue] = useState(editNote?.content || '');
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || '');
  const [priority, setPriority] = useState(editNote?.priority || 'low');

  const closeCreateNoteModal = () => {
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  //노트에 태그 더하기
  const tagsHandler = (tag: string, type: string) => {
    const newTag = tag.toLowerCase();
    if (type === 'add') {
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
      //type==='add'가 false이면 newTag와 일치하지않는 태그들만 필터링하여 남기기
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };

  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error('You must add title');
      return;
    } else if (value === '<p><br></p>') {
      toast.error('You must write note');
      return;
    }

    const date = dayjs().format('DD/MM/YY h:mm A');

    //note는 Note의 파셔 타입 -> partial안에 있는 타입들중에 하나라도 사용되고있으면 된다!
    let note: Partial<Note> = {
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };

    if (editNote) {
      note = { ...editNote, ...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  return (
    <FixedContainer>
      {/* viewAddTagsModal이 true일 때 TagsModal 컴포넌트를 렌더링
      add 타입으로 설정되고, addedTags와 tagsHandler 함수를 props로 전달 */}
      {viewAddTagsModal && (
        <TagsModal type='add' addedTags={addedTags} handleTags={tagsHandler} />
      )}
      <Box>
        <TopBox>
          <div className='createNote__title'>노트생성하기</div>
          <DeleteBox
            className='createNote__close-btn'
            onClick={closeCreateNoteModal}
          >
            <FaTimes />
          </DeleteBox>
        </TopBox>
        <StyledInput
          type='text'
          value={noteTitle}
          name='title'
          placeholder='제목...'
          onChange={(e) => setNoteTitle(e.target.value)}
        />
        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor} />
        </div>
        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className='createNote__tag'>{tag}</span>
              <span
                className='createNote__tag-remove'
                onClick={() => tagsHandler(tag, 'remove')}
              >
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>

        <OptionsBox>
          <ButtonOutline
            onClick={() =>
              dispatch(toggleTagsModal({ type: 'add', view: true }))
            }
          >
            Add Tag
          </ButtonOutline>
          <div>
            {/* 라벨태그 for , select id 동일하게 */}
            <label htmlFor='color'>배경색 : </label>
            <select
              value={noteColor}
              id='color'
              onChange={(e) => setNoteColor(e.target.value)}
            >
              <option value=''>White</option>
              <option value='#ffcccc'>Red</option>
              <option value='#ccffcc'>Green</option>
              <option value='#cce0ff'>Blue</option>
              <option value='#ffffcc'>Yellow</option>
            </select>
          </div>

          <div>
            <label htmlFor='priority'>우선순위 : </label>
            <select
              value={priority}
              id='priority'
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value='low'>Low</option>
              <option value='high'>High</option>
            </select>
          </div>
        </OptionsBox>

        <div className='createNote__create-btn'>
          <ButtonFill onClick={createNoteHandler}>
            {editNote ? (
              <span>저장하기</span>
            ) : (
              <>
                <FaPlus />
                <span>생성하기</span>
              </>
            )}
          </ButtonFill>
        </div>
      </Box>
    </FixedContainer>
  );
};

export default CreateNoteModal;
