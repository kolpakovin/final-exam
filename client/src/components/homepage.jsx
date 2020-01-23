import React, { Component } from 'react';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameOn: false,
            gameOver: false,
            from: null,
            to: null,
            theNumberOfUser: null
        }
    }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        }, console.log(name, this.state[name]))
    }
    getNumber = () => {

    }
    render() {
        return (
            <div>
                <h1>Hello</h1>
                <div class="form-group col-md-2">
                    <label >Enter your name please</label>
                    <input type="text" class="form-control" id="input1" name="name" onChange={(e) => this.handleChange(e)} />
                </div>
                <h1>Choose range of numbers</h1>
                <div class="form-group col-md-2">
                    <label>From</label>
                    <input type="text" class="form-control" id="input2" name="from" onChange={(e) => this.handleChange(e)} />
                </div>
                <div class="form-group col-md-2">
                    <label >To</label>
                    <input type="text" class="form-control" id="input3" name="to" onChange={(e) => this.handleChange(e)} />
                </div>
                <div>
                    <button>Choose this range</button>
                </div>
                {
                    this.state.gameOn
                            &&
                    <div class="form-group col-md-4">
                        <label for="inputState">Is the number you choosed equal, bigger or smaller then {this.state.theNumberOfUser}</label>
                        <select name="sale_status" onClick={(e) => this.handleChange(e)} id="inputState" class="form-control">
                            <option value="sale" selected>equal</option>
                            <option value="rent" >smaller</option>
                            <option value="both" >bigger</option>
                        </select>
                    </div>
                }
            </div>
        );
    }
}

export default Homepage;