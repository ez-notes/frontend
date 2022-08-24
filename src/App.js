import { Route, Routes } from 'react-router-dom';
import './App.css';
import Notes from './components/Notes';
import Header from './components/Header';
import NoteEditor from './components/NoteEditor';

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
