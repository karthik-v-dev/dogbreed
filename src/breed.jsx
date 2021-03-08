import React from "react";
import Model from "react-modal";
import Breedlist from "./breedlist.jsx";
import Breedlistreq from "./breedlistreq.jsx";

export default class Dogimg extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props,
      Dog_images: undefined,
      disa: false,
    };
  }
  componentDidMount() {
    fetch("https://dog.ceo/api/breed/" + this.state.data.id + "/images/random")
      .then((response) => response.json())
      .then((difbreed) => {
        console.log("DATA " + JSON.stringify(difbreed));
        this.setState({ Dog_images: difbreed.message });
      });
  }
  render() {
    console.log(
      "KEY " + this.state.data.breed + " Image " + this.state.Dog_images
    );
    let imageComp;
    let x = this.state.data.id.toUpperCase();
    if (this.state.Dog_images !== undefined) {
      imageComp = (
        <img
          src={this.state.Dog_images}
          id={this.state.data.id}
          width="100"
          height="100"
          alt="breeds"
        />
      );
    } else {
      imageComp = <div>Loading</div>;
    }

    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              disa: this.state.data.breed !== undefined ? true : false,
            })
          }
          style={{ outline: "none" }}
        >
          {imageComp}
        </button>
        <Model
          isOpen={this.state.disa}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => this.setState({ disa: false })}
          style={{
            overlay: { backgroundColor: "grey" },
            content: { color: "orangered" },
            width: "50%",
            height: "100vh",
          }}
        >
          <div style={{ backgroundColor: "lightgray" }}>
            <header style={{ textAlign: "center", marginTop: "-20px" }}>
              {" "}
              DOG BREED {x}
            </header>
            <header>
              {" "}
              <button
                onClick={() => this.setState({ disa: false })}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "2px 8px",
                  outline: "none",
                  borderRadius: "4px",
                  marginTop: "-20px",
                  float: "right",
                }}
              >
                X
              </button>
            </header>
          </div>
          <h5>Sub Breeds</h5>
          <br />
          <Breedlist val={this.state.data.id} subval={this.state.data.breed} />
          <br />
          <h5>More Images</h5> <br />
          <Breedlistreq
            val={this.state.data.id}
            subval={this.state.data.breed}
          />
          <br />
        </Model>

        <br />
        {this.state.data.id}
      </div>
    );
  }
}
