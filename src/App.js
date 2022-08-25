import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notes from './components/notesComponents/Notes';
import NoteEditor from './components/notesComponents/NoteEditor';
import Header from './components/Header'
import AddNote from './components/notesComponents/AddNote';
import AddNoteButton from './components/notesComponents/AddNoteButton';

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddNoteButton />
      <Routes>
        <Route path='/' exact element={<Notes />} />
        <Route path='/notes/:id' element={<NoteEditor />} />
        <Route path='/new-note' element={<AddNote />} />
      </Routes>
    </div>
  );
}

export default App;
