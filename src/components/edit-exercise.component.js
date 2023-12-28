
//import react, component, axios, and datepicker
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercises extends Component {

    //constructor for EditExercises component
    constructor(props) {

        //since this class is a subclass of Component, constructor needs to call Component constructor
        super(props);

        //bind 'this' of each method to 'this' class; reference all 'this' to class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //initializes the state of the class
        this.state= {
            username : '',
            description : '',
            duration : 0,
            date : new Date(),
            users : []
        }
    }

    //react lifecycle method, automatically called when anything is displayed on the page
    componentDidMount(){
        axios.get('http://lcoalhost:5000/exercises/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                username: response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            })
        })
        .catch(function (error) {console.log(error)})
        
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users : response.data.map(user => user.username)
                })
            }
        })
    }

    //changes username attribute of state from input
    onChangeUsername(e) {
        this.setState({
            username : e.target.value
        })
    }

    //changes description attribute of state from input
    onChangeDescription(e) {
        this.setState({
            description : e.target.value
        })
    }

    //changes duration attribute of state from input
    onChangeDuration(e) {
        this.setState({
            duration : e.target.value
        })
    }

    //changes date attribute of state from input
    onChangeDate(date) {
        this.setState({
            date : date
        })
    }

    onSubmit(e){
        e.preventDefault();

        //gets values from current state submitted to form
        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date 
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update'+this.propsmatch.params.id, exercise) /*POST request being sent to back end*/
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return(

            //form to edit an exercise
            <div>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                    <label>Username: </label>
                    <select ref="userInput"
                        required
                        className="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {
                            this.state.users.map(function(user) {
                            return <option 
                                key={user}
                                value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                    </div>
                    <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={this.state.duration}
                        onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
                </div>
        );
    }
}