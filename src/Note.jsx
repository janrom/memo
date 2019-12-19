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
        <div className="form-group">
          <input type="text" id={id} name="heading" value={heading} onChange={handleChange} className="form-control" />
          <textarea id={id} name="content" value={content} onChange={handleChange} className="form-control" rows="5" />
        </div>
        <div className="row form-group">
          <div className="col col-lg-2">
            <input type="submit" value="Update" class="btn btn-primary" />
          </div>
          <div className="col col-log-8" />
          <div className="col col-lg-2 align-self-end">
            <button type="button" name={id} onClick={handleDelete} class="btn btn-danger">Delete</button>
          </div>
        </div>
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
