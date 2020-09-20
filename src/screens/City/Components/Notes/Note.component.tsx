import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoIosTrash } from 'react-icons/io';

import { Button, TextArea } from 'library/common/components';

import './Note.style.scss';
import { INotesProps } from './Note.type';

const Notes = ({ city, deleteNote, notes, saveNotes }: INotesProps): JSX.Element | null => {
  const [note, setNote] = useState<string>('');
  const [selected, setSelectedNote] = useState<number | null>(null);

  const onNoteAddClick = () => {
    saveNotes(city, note, selected);
    setNote('');
    setSelectedNote(null);
  };

  const onNotesChange = (event: any): void => {
    setNote(event.target.value);
  };

  const onNoteEdit = index => () => {
    if (notes) {
      setNote(notes[index]);
      setSelectedNote(index);
    }
  };

  const onNoteDelete = index => () => {
    deleteNote(city, index);
  };

  return (
    <div className="mt-4">
      Notes:
      {notes &&
        !!notes.length &&
        notes.map((item, index) => (
          <div key={index} className="d-flex align-items-start note">
            <div className="p-2">
              <AiOutlineEdit onClick={onNoteEdit(index)} />
            </div>
            <div className="p-2">
              <IoIosTrash onClick={onNoteDelete(index)} />
            </div>
            <div className="p-2">{item}</div>
          </div>
        ))}
      <TextArea className="mt-2 mb-2" placeholder="Add new note..." onChange={onNotesChange} value={note} />
      {note && <Button className="mb-4" label="Save" onClick={onNoteAddClick} />}
    </div>
  );
};

export default Notes;
