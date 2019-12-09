import React from 'react';
import PropTypes from 'prop-types';

function ListNotes({ notes }) {
  const mappedNotes = notes.map((note) => (
    <div key={note.id}>
      <h3>{note.heading}</h3>
      <p>{note.content}</p>
      <button type="button" id={note.updateId}>Update</button>
      <button type="button" id={note.deleteId}>Delete</button>
    </div>
  ));

  return (
    <div id="listNotes" className="col-4 container p-4">
      <h2>My notes</h2>
      {mappedNotes}
    </div>
  );
}

ListNotes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListNotes;
