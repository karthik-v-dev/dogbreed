import React from "react";
import _ from "lodash";
import "./App.css";

export default class Breedlist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props,
      togbreedlist: undefined,
      subbreedran: undefined,
      images: [],
    };
  }

  getImageUrl(name) {
    if (this.state.images[name] === undefined) {
      fetch(
        "https://dog.ceo/api/breed/" +
          this.state.data.val +
          "/" +
          name +
          "/images/random"
      )
        .then((res) => res.json())
        .then((tog) => {
          let ms = this.state.images;
          ms[name] = tog.message;
          this.setState({ images: ms });
        });
    } else {
      return this.state.images[name];
    }
  }

  //

  render() {
    let breedsub_img;
    if (this.state.data.subval !== undefined) {
      breedsub_img = [];
      _.forEach(this.state.data.subval, (subname) => {
        if (this.getImageUrl(subname) !== undefined) {
          // breedsub_img.push( <img src={this.state.images[subname]} key={this.state.data.id} alt="imgs" width="100" height="100" /> );

          // breedsub_img.push(subname);
          breedsub_img.push(
            <figure>
              <img
                src={this.state.images[subname]}
                key={this.state.data.id}
                alt="imgs"
                width="100"
                height="100"
              />
              <figcaption>{subname}</figcaption>
            </figure>
          );
        } else {
          breedsub_img.push("Loading " + subname);
        }
      });
    } else {
      breedsub_img = <div> loding..</div>;
    }

    return (
      <div>
        <div className="cardlist">{breedsub_img}</div>
      </div>
    );
  }
}
