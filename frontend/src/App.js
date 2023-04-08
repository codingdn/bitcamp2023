import './App.css';
import SearchBar from './components/SearchBar';
import NextButton from './components/NextButton';
import TextField from '@mui/material/TextField';

function App() {
  return (
    <div className="App">
      <h1>RecommendMe</h1>
      <h3>Insert Major</h3>
      <SearchBar/>
      <NextButton/>

      <h3>Select Courses Taken</h3>
      <SearchBar/>
      <NextButton/>

      <h3>Find Courses</h3>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

    </div>
  );
}

export default App;
