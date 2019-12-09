import React, { useState } from 'react';
import _uniqueId from 'lodash.uniqueid';
import AddNote from './AddNote';
import ListNotes from './ListNotes';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const note = {
      heading: e.target.heading.value,
      content: e.target.content.value,
      id: _uniqueId('note-'),
      updateId: _uniqueId('update-'),
      deleteId: _uniqueId('delete-'),
    };

    e.target.heading.value = '';
    e.target.content.value = '';

    this.setState((state) => (
      {
        notes: state.notes.concat([note]),
      }
    ), () => {
      // FIXME: show template
      console.log('New note added.');
    });
  }

  render() {
    const { notes } = this.state;
    return (
      <>
        <ListNotes notes={notes} />
        <AddNote onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default App;
