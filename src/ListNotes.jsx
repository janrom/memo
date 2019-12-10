import React from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash.uniqueid';
import Note from './Note';

function ListNotes({ notes, handleDelete }) {
  const mappedNotes = notes.map((note) => {
    return (
      <Note
        key={note._id}
        id={note._id}
        heading={note.heading}
        content={note.content}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <div id="listNotes" className="col-4 container p-4">
      <h2>My notes</h2>
      {mappedNotes}
    </div>
  );
}

ListNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListNotes;
