import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notes from './components/notesComponents/Notes';
import NoteEditor from './components/notesComponents/noteEditor/NoteEditor';
import Header from './components/Header'
import AddNoteButton from './components/notesComponents/addNote/AddNoteButton';
import AddNote from './components/notesComponents/addNote/AddNoteModal';
import Login from './components/userComponents/Login';
import NewVisitor from './components/newVisitor/NewVisitor';

const App = () => {
  return (
    <div className="App">
      <div class="area" >
      <Header />
      <NewVisitor />
      <Routes>
        <Route path='/' exact element={<Notes />} />
        <Route path='/notes/:id' element={<NoteEditor />} />
        <Route path='/new-note' element={<AddNote />} />
        <Route path='login' element={<Login />} />
        </Routes>
        {/* below is just for floating notes in bg, see div class"area" above */}
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
  );
}

export default App;
