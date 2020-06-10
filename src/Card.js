import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    const randomNr = Math.floor(Math.random() * 150);

    return (
      <div
        className="Card"
        style={{
          color: "red",
          position: "absolute",
          marginLeft: " 43%",
          marginTop: "10%",
          transform: `rotate(${randomNr}deg)`,
        }}
      >
        <img src={this.props.img} />
      </div>
    );
  }
}

export default Card;
