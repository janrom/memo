import React from 'react';
import Note from './Note';
import AddNote from './AddNote';
import ListNotes from './ListNotes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.fetchNotes();
  }

  componentDidUpdate(prevProps, prevState) {
    // event after setState is finished
  }

  fetchNotes() {
    fetch('http://localhost:3001/notes')
      .then((res) => res.json())
      .then((json) => {
        if (json.err) {
          console.log('Error response from get /notes', json.err);
          // FIXME
          return alert('Fetching notes failed.');
        }
        console.log(json.notes);
        this.setState({ notes: json.notes });
      })
      .catch((err) => console.log(err));
  }

  // Create new note from user input.
  handleSubmit(e) {
    const note = Note({
      heading: e.target.heading.value,
      content: e.target.content.value,
    });

    this.setState((state) => (
      {
        notes: state.notes.concat([note]),
      }
    ));
  }

  // Delete the note which delete button is clicked
  handleDelete(e) {
    const { notes } = this.state;
    const filteredNotes = notes.filter((note) => note._id !== e.target.value);

    this.setState({ notes: filteredNotes });
  }

  render() {
    const { notes } = this.state;
    return (
      <>
        <ListNotes notes={notes} handleDelete={this.handleDelete} />
        <AddNote onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default App;
