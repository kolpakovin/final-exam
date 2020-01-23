import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { getHistory, postGame } from '../dataFromServer/dataFromServer';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gameOn: false,
            gameOver: false,
            statusOfGuess: null,
            startFrom: null,
            startTo: null,
            from: null,
            to: null,
            theNumberOfUser: null,
            tries: 1,
            allMyNumbers: '',
            table: null,
            userError: false
        }
    }
    componentDidMount(){
        this.getData()
    }
    handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }
    finishGame = async () => {
        console.log(" is working")
        this.setState({
            gameOver: true
        })
        const {name, startFrom, startTo, theNumberOfUser,tries ,allMyNumbers} = this.state
        const game = {
            user_name : name,
            numbers_range : `from ${startFrom} to ${startTo}`,
            the_number_of_user : theNumberOfUser,
            amount_of_tries : tries,
            all_numbers_of_comp : allMyNumbers
        }
        await postGame(game)
        await this.getData()
    }
    getNumber = () => {
        if (this.state.statusOfGuess === "bigger") {
            const anotherGuess = this.state.theNumberOfUser;
            let allMyNumbers = this.state.allMyNumbers
            allMyNumbers += anotherGuess + ", "
            const from = parseInt(this.state.theNumberOfUser) + 1
            const to = parseInt(this.state.to)
            const theNumberOfUser = parseInt((from + to) / 2)
            const tries = this.state.tries + 1
            console.log(theNumberOfUser)
            this.setState({
                theNumberOfUser,
                tries,
                from,
                to,
                allMyNumbers
            })
        } else if (this.state.statusOfGuess === "smaller") {
            const anotherGuess = this.state.theNumberOfUser;
            let allMyNumbers = this.state.allMyNumbers
            allMyNumbers += anotherGuess + ", "
            const from = parseInt(this.state.from)
            const to = parseInt(this.state.theNumberOfUser) - 1
            const theNumberOfUser = parseInt((from + to) / 2)
            const tries = this.state.tries + 1
            console.log(theNumberOfUser)
            this.setState({
                theNumberOfUser,
                tries,
                from,
                to,
                allMyNumbers
            })
        } else if (this.state.statusOfGuess === "equal") {
            const anotherGuess = this.state.theNumberOfUser;
            let allMyNumbers = this.state.allMyNumbers
            allMyNumbers += anotherGuess
            this.setState({
                allMyNumbers
            },() => this.finishGame())            
        } else {
            const theNumberOfUser = parseInt((parseInt(this.state.from) + parseInt(this.state.to)) / 2)
            this.setState({
                theNumberOfUser,
                userError: false
            })
        }
    }
    startGame = (e) => {
        e.preventDefault()
        const startFrom = this.state.from
        const startTo = this.state.to
        if(parseInt(startFrom) > parseInt(startTo)){
            this.setState({
                userError: true
            })
        } else {
            this.setState({
                startFrom,
                startTo,
                gameOn: true
            }, () => this.getNumber())
        }
        
    }
    getData = async () => {
        const table = await getHistory()
        this.setState({
            table
        })
    }
    render() {
        return (
            <div>
                <div id="main-div">
                <h1>Hello</h1>
                <div className=" col-md-4 text-center ml-auto mr-auto">
                    <label >Enter your name please</label>
                    <input type="text" className="form-control" id="input1" name="name" onChange={(e) => this.handleChange(e)} />
                </div>
                <h1>Choose range of numbers</h1>
                <div className="d-flex m-2 mr-auto ml-auto" style={{width: '60%'}} >
                    <div className="mr-2">
                        <label>From</label>
                        <input type="text" className="form-control" id="input2" name="from" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="mr-2">
                        <label >To</label>
                        <input type="text" className="form-control" id="input3" name="to" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="d-flex">
                        <button style={{marginTop: "23px", border: "3px solid transparent", borderRadius: "34px", backgroundColor: "#9083ff"}} onClick={(e) => this.startGame(e)}>Choose this range</button>
                    </div>
                </div>
                {
                    this.state.userError
                            &&
                    <div>
                        <h1>Incorrect range. Right number can't be smaller then left number. Please try again</h1>
                    </div>
                }
                {
                    this.state.gameOn
                            &&
                    
                    <div>
                        <label htmlFor="inputState"><h5>Is the number you choosed equal, bigger or smaller then {this.state.theNumberOfUser}</h5></label>
                        <div className="ml-auto mr-auto col-md-4">
                            <select name="statusOfGuess" onClick={(e) => this.handleChange(e)} id="inputState" className="form-control">
                                <option defaultValue="equal" >equal</option>
                                <option value="smaller" >smaller</option>
                                <option value="bigger" >bigger</option>
                            </select>
                            <button className="mt-2" style={{padding: "3px 13px", border: "3px solid transparent", borderRadius: "34px", backgroundColor: "#9083ff"}}
                                         onClick={() => this.getNumber()}>Submit</button>
                                         
                        </div>
                    </div>
                }
                {
                    this.state.gameOver
                    &&
                    <div>
                        <h1>It's took only {this.state.tries} tries to guess number {this.state.theNumberOfUser}</h1>
                    </div>
                }
                </div>
                
                <div style={{bacground: "white",color: "#b05bff"}}><h1>Game History</h1></div>
                {this.state.table !== null
                    &&
                    <div className="ml-auto mr-auto" style={{width: "70%", backgroundColor: "white"}}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Player's name</th>
                                    <th>Date</th>
                                    <th>Range</th>
                                    <th>The player's number</th>
                                    <th>Amount Of Tries</th>
                                    <th>Tries</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.table.map((game, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{game.user_name}</td>
                                            <td>{game.date_of_game.slice(0,10)}</td>
                                            <td>{game.numbers_range}</td>
                                            <td>{game.the_number_of_user}</td>
                                            <td>{game.amount_of_tries}</td>
                                            <td>{game.all_numbers_of_comp}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>}


            </div>
        );
    }
}

export default Homepage;