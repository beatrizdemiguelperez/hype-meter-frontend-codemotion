import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/Home';
import Form from './pages/Form';
import Result from './pages/Result';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
  palette: {
    primary: orange,
  },
  status: {
    danger: 'orange',
  },
});


function App() {
  return (
    <div className="main">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/result/:id" component={Result} />
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
