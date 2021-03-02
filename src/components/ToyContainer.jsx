import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map((toy) => {
        return <ToyCard id={toy.id} toyName = {toy.name} toyImg = {toy.image} toyLikes = {toy.likes}/>
      })
      }

    </div>
  );
}

export default ToyContainer;
