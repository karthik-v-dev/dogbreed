import React from "react";

import "./App.css";

export default class Breedlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props,

      images: [],
    };
  }

  componentDidMount() {
    console.log("Fetching images...");
    fetch(
      "https://dog.ceo/api/breed/" + this.state.data.val + "/images/random/6"
    )
      .then((res) => res.json())
      .then((tog) => {
        this.setState({ images: tog.message });
      });
  }

  //

  render() {
    return (
      <div className="cardlist">
        {this.state.images.map((img) => {
          return <img src={img} alt="rand" height="100" width="100" />;
        })}
      </div>
    );
  }
}
