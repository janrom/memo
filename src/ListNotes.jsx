import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

function ListNotes({
  notes,
  handleChange,
  handleUpdate,
  handleDelete,
}) {
  const mappedNotes = notes.map((note) => (
    <Note
      key={note._id}
      id={note._id}
      heading={note.heading}
      content={note.content}
      handleChange={handleChange}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
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
  handleChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ListNotes;
