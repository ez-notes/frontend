import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notes from './components/notesComponents/Notes';
import NoteEditor from './components/notesComponents/NoteEditor';
import Header from './components/Header'

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' exact element={<Notes />} />
        <Route path='/notes/:id' element={<NoteEditor />} />
      </Routes>
    </div>
  );
}

export default App;
