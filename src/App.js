
//import packages, modules, and components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//import dev created components
import Navbar from "./components/Navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//function defines jsx for web page
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>

        {/* provide routing for each page from navbar */}
        <Routes>
          <Route path="/" exact Component={ExercisesList}/>
          <Route path="/edit/:id" exact Component={EditExercise}/>
          <Route path="/create" exact Component={CreateExercise}/>
          <Route path="/user" exact Component={CreateUser}/>
        </Routes>
      </div>
    </Router>
  );
}

//export jsx to index.js which sends to html template
export default App;