import React from 'react';
import './App.css';
import { List } from './components/List';

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <List></List>
      </div>
    </div>
  );
}

export default App;
