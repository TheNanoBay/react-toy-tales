import React, { Component } from 'react';

class ToyCard extends Component {

  handleDelete = (event) =>{
    event.preventDefault()
    
    fetch(`http://localhost:3000/toys/${this.props.id}`, {method: "DELETE"})
    .then(res => res.json()) // or res.json()
    .then(deletedToy => {
      console.log(deletedToy)
    })
    this.props.deleteToy(this.props.id)
  }

  handleLike = () => { 
    
    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: this.props.toyLikes + 1
      })
    }
    fetch(`http://localhost:3000/toys/${this.props.id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedToy => {
        console.log(updatedToy)
        this.props.updateToy(updatedToy)
      })
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyName}</h2>
        <img src={this.props.toyImg} alt={this.props.toyName} className="toy-avatar" />
        <p>{this.props.toyLikes} Likes </p>
        <button className="like-btn" onClick={this.handleLike}  >Like {'<3'}</button>
        <button className="del-btn" id={this.props.id} onClick={this.handleDelete}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
