import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  viewEditTagsModal: boolean;
  viewAddTagsModal: boolean;
  viewCreateNoteModal: boolean;
  viewFiltersModal: boolean;
}

const initialState: ModalState = {
  viewEditTagsModal: false,
  viewAddTagsModal: false,
  viewCreateNoteModal: false,
  viewFiltersModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleCreateNoteModal: (state, action) => {
      state.viewCreateNoteModal = action.payload;
    },

    toggleFiltersModal: (state, action) => {
      state.viewFiltersModal = action.payload;
    },

    toggleTagsModal: (state, action) => {
      const type = action.payload.type;
      const view = action.payload.view;

      if (type === 'add') {
        state.viewAddTagsModal = view;
      } else {
        state.viewEditTagsModal = view;
      }
    },
  },
});

export const { toggleCreateNoteModal, toggleFiltersModal, toggleTagsModal } =
  modalSlice.actions;

export default modalSlice.reducer;
