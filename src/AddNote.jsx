import React from 'react';
import PropTypes from 'prop-types';

function AddNote({ onSubmit }) {
  return (
    <div id="addNote" className="col-4 container p-4 mt-4">
      <h2>Add new note</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="heading">Heading</label>
          <input type="text" id="heading" name="heading" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="10" />
        </div>
        <div>
          <input type="submit" id="submit" className="btn btn-primary" value="Add" />
        </div>
      </form>
    </div>
  );
}

AddNote.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddNote;
