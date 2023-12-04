import React, { Dispatch } from 'react';
import { Note } from '../types/note';

const getRelevantBtns = (type: string, note: Note, dispatch: Dispatch) => {
  if (type === 'archive'){
      return (
  
    );

  }else if(type === 'trash') {
    return(

    )
  }else{
    return ()
  }
  
};

export default getRelevantBtns;
