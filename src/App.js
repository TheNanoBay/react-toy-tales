import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    display: false,
    toys : [],
    newToy: {
      name: '',
      image:''
    }
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        toys: toys
      })
    })
  }

  handleFormSubmit = (event) =>{
    //scrape the data from state 
    //update BE / FE in body of BE return 

    event.preventDefault()
    this.updateBackEnd()

  }

  updateBackEnd = () => {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },    
      body: JSON.stringify(this.state.newToy)
    })
    .then(resp => resp.json())
    .then(newToy => {
      this.setState({
        toys: [
          ...this.state.toys,
          newToy
        ]
      })
  
    })
  }

  handleFormChange = (event) => {
    this.setState({
      newToy:{
        ...this.state.newToy,
        [event.target.name]: event.target.value  
      }
    })

    console.log(this.state.newToy)

  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display? <ToyForm toyName={this.state.newToy.name} toyImage={this.state.newToy.image} handleFormChange={this.handleFormChange} handleFormSubmit={this.handleFormSubmit}/> : null }

        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>  
        <ToyContainer toys = {this.state.toys} />
      </>
    );
  }

}

export default App;
