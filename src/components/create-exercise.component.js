
//import react, component, axios, and datepicker
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

export default class CreateExercises extends Component {

    //constructor for CreateExercises component
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
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users : response.data.map(user => user.username),
                    username : response.data[0].username
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

        axios.post('http://localhost:5000/exercises/add', user) /*POST request being sent to back end*/
        .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return(

            //form to create an exercise
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                //array of all users from MongoDB databse
                                this.state.users.map(function(user){

                                    //returns array of users as selections in dropdown
                                    return <option key ={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}