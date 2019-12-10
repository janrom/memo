import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _uniqueId from 'lodash.uniqueid';

function Note(props) {
  const [heading, setHeading] = useState(props.heading);
  const [content, setContent] = useState(props.content);
  const { id, handleDelete } = props;

  const handleUpdate = (e) => {
    console.log('handleUpdate called in Note', e.target);
  };

  return (
    <div key={id}>
      <h3>{heading}</h3>
      <p>{content}</p>
      <button type="button" name="update" value={id} onClick={handleUpdate}>Update</button>
      <button type="button" name="delete" value={id} onClick={handleDelete}>Delete</button>
    </div>
  );
}

Note.prototypes = {
  id: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Note;
