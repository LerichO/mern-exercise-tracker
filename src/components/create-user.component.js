
//import component from react, axios for http requests
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    //constructor for CreateExercises component
    constructor(props) {

        //since this class is a subclass of Component, constructor needs to call Component constructor
        super(props);

        //bind 'this' of each method to 'this' class; reference all 'this' to class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //initializes the state of the class
        this.state= {
            username : ''
        }
    }

    //changes username attribute of state from input
    onChangeUsername(e) {
        this.setState({
            username : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        //gets values from current state submitted to form
        const user = {
            username : this.state.username
        }

        console.log(user);

        //in an actual deployment or case, URI should be replaced with a variable holding
        //the actual URI of the db that the serverside application is running on
        axios.post('http://localhost:5000/users/add', user) /*POST request being sent to back end*/
        .then(res => console.log(res.data));

        //resets the state of this component so user can input multiple users
        this.setState({
            username : ''
        })

    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}