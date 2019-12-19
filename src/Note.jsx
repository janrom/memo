import React from 'react';
import PropTypes from 'prop-types';

function Note({
  id,
  heading,
  content,
  handleChange,
  handleUpdate,
  handleDelete,
}) {
  return (
    <div key={id}>
      <form onSubmit={handleUpdate}>
        <input type="text" id={id} name="heading" value={heading} onChange={handleChange} />
        <textarea id={id} name="content" value={content} onChange={handleChange} rows="5" />
        <input type="submit" value="Update" />
        <button type="button" name={id} onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Note;
