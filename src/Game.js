import React, { Component } from "react";
import "./Game.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import Card from "./Card";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      currentCardIndex: -1,
      generatedCardIndexes: [],
      message: "No Cards",
    };
    this.generateNewCard = this.generateNewCard.bind(this);
    this.handleResetButton = this.handleResetButton.bind(this);
  }

  async componentDidMount() {
    const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const res = await axios.get(url);
    const deck_id = res.data.deck_id;
    const get_cards_url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`;

    this.fetchCards(get_cards_url);
  }

  async fetchCards(url) {
    const res = await axios.get(url);
    const cardObjects = res.data.cards;

    this.setState({
      cards: [...this.state.cards, ...cardObjects],
    });
    if (res.data.remaining > 0) {
      this.fetchCards(url);
    }
  }

  generateNewCard() {
    if (this.state.currentCardIndex <= 52) {
      const index = this.state.currentCardIndex + 1;
      const currentGeneratedCardIndexes = this.state.generatedCardIndexes;
      currentGeneratedCardIndexes.push(index);
      this.setState(
        {
          currentCardIndex: index,
          message: "No more Cards",
          generatedCardIndexes: currentGeneratedCardIndexes,
        },

        () => console.log(this.state)
      );
    }
  }

  handleResetButton() {
    this.setState(() => {
      return {
        cards: [],
        currentCardIndex: -1,
        generatedCardIndexes: [],
        message: "Deck has been reset!",
      };
    });
    this.componentDidMount();
  }

  render() {
    return (
      <div>
        <p>
          Cards:{" "}
          {this.state.currentCardIndex < 52
            ? this.state.currentCardIndex + 1
            : 0}
        </p>
        <Button id="btn-1" onClick={this.generateNewCard} variant="primary">
          Gimme a Card
        </Button>{" "}
        <div className="Game">
          {this.state.currentCardIndex < 52 &&
          this.state.currentCardIndex !== -1 ? (
            this.state.generatedCardIndexes &&
            this.state.generatedCardIndexes.map((i) => (
              <Card img={this.state.cards[i].image} />
            ))
          ) : (
            <div>
              <h1>{this.state.message}</h1>
            </div>
          )}
        </div>
        <Button onClick={this.handleResetButton} variant="warning">
          Reset Deck
        </Button>
      </div>
    );
  }
}

export default Game;
