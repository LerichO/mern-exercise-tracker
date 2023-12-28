
//import component from react
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

//Exercise component, implemented as a functinoal React component       *** LACKS state and life cycle methods, only needs to return JSX ***
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
)

//Exercise list component, implemented as a class component             *** HAS state and life cycle methods ***
export default class ExercisesList extends Component {

    //constructor for ExercisesList component
    constructor(props){

        //since this class is a subclass of Component, constructor needs to call Component constructor
        super(props);
        
        //bind 'this' and set the default state of this component
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises : []};
    }

    //react lifecycle method, automatically called when anything is displayed on the page
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({exercises: response.data})
        })
        .catch((error) => {console.log(error)})
    }

    //deletes given exercises by id and through DELETE request
    deleteExercise(id){
        axios.delete('htttp://localhost:5000/exeercises/'+id)
        .then(res => console.log(res.data));

        //returns each element that is not the element to be deleted
        this.setState({
            exercises : this.state.exercises.filter(element => element._id !== id)
        })
    }

    //returns an exercise component list
    exerciseList(){
        return this.state.exercises.map(currentExercise => {

            //return Exercise component with props exercise, deleteExercise, and key
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        );
    }
}