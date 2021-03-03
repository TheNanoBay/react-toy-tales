import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  state = {
    status: "",
    display: false,
    toys : [],
    newToy: {
      name: '',
      image:'',
      likes: 0
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
    this.setState({
      newToy:{
        name: '',
        image:'',
        likes: 0
      }
    })
    
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
  }

  deleteToy = (id) =>{
    let filteredToys = this.state.toys.filter(toy => toy.id !== id)

    this.setState({
      toys: filteredToys
    })

  }

  updateToy = (updatedToy) => {
    const updatedToys = this.state.toys.map(toyObj => {
      if(toyObj.id === updatedToy.id){
        return updatedToy
      } else {  
        return toyObj
      }
    })

    this.setState({
      toys: updatedToys
    })

  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display? <ToyForm toyName={this.state.newToy.name} toyImage={this.state.newToy.image} handleFormChange={this.handleFormChange} handleFormSubmit={this.handleFormSubmit}/> : null }

        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>  
        <ToyContainer toys = {this.state.toys} deleteToy={this.deleteToy} updateToy={this.updateToy} />
      </>
    );
  }

}

export default App;
