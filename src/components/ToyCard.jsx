import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyName}</h2>
        <img src={this.props.toyImg} alt={this.props.toyName} className="toy-avatar" />
        <p>{this.props.toyLikes} Likes </p>
        <button className="like-btn">Like {'<3'}</button>
        <button className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
