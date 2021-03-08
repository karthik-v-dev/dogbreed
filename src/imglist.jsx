import React from "react";

import "./App.css";

export default class Imglist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props,

      images: [],
    };
  }

  componentDidMount() {
    let x = this.state.data.typebred;
    let y = this.state.data.num;
    console.log("Fetching images...");
    fetch("https://dog.ceo/api/breed/" + x + "/images/random/" + y + "")
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
