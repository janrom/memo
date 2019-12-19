import React from 'react';
import axios from 'axios';
import AddNote from './AddNote';
import ListNotes from './ListNotes';

const BACKEND_URL = 'http://localhost:3001';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { notes } = this.state;
    if (notes.length === 0) {
      this.getNotes();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // event after setState is finished
    const { notes } = this.state;
    if (notes.length !== prevState.notes.length) {
      console.log('this.state.notes: ', notes);
      console.log('prevState.notes: ', prevState.notes);
    }
  }

  getNotes() {
    console.log('Fetch notes');
    fetch(`${BACKEND_URL}/notes`)
      .then((res) => res.json())
      .then((json) => {
        if (json.err) {
          console.log('Error response from get /notes', json.err);
          // FIXME
          return alert('Fetching notes failed.');
        }
        return this.setState((state) => (
          { notes: state.notes.concat(json.notes) }
        ));
      })
      .catch((err) => console.log(err));
  }

  // Create new note from user input.
  handleSubmit(e) {
    e.preventDefault();

    const note = {
      heading: e.target.heading.value,
      content: e.target.content.value,
    };

    e.target.heading.value = '';
    e.target.content.value = '';

    axios({
      method: 'post',
      url: `${BACKEND_URL}/add`,
      data: note,
    }).then((res) => {
      this.setState((prevState) => (
        { notes: prevState.notes.concat(res.data) }
      ));
    });
  }

  handleChange(e) {
    let { notes } = this.state;
    const changedNote = notes.find((n) => n._id === e.target.id);

    if (!changedNote) return;

    if (e.target.name === 'heading') {
      changedNote.heading = e.target.value;
    } else {
      changedNote.content = e.target.value;
    }

    notes = notes.map((n) => {
      if (n._id === changedNote.id) {
        return changedNote;
      }
      return n;
    });

    this.setState({ notes });
  }

  handleUpdate(e) {
    e.preventDefault();

    const { notes } = this.state;
    const changedNote = notes.find((n) => n._id === e.target.heading.id);

    if (!changedNote) return;

    axios({
      method: 'put',
      url: `${BACKEND_URL}/update`,
      data: changedNote,
    }).then((res) => {
      console.log(res.data);
    });
  }


  // Delete the note which delete button is clicked
  handleDelete(e) {
    let { notes } = this.state;
    const deleteId = e.target.name;
    notes = notes.filter((note) => note._id !== deleteId);

    this.setState({ notes });
    axios({
      method: 'delete',
      url: `${BACKEND_URL}/delete`,
      data: { deleteId },
    }).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    const { notes } = this.state;
    return (
      <>
        <ListNotes
          notes={notes}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
        />
        <AddNote onSubmit={this.handleSubmit} />
      </>
    );
  }
}

export default App;
