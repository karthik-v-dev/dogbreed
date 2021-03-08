import React from "react";
import "./App.css";
import Dogimg from "./breed.jsx";
import Model from "react-modal";
import Imglist from "./imglist.jsx";

const _ = require("lodash");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Dogs: undefined,
      filval: undefined,
      disa: false,
      weight: undefined,
      bredval: undefined,
      bredinval: undefined,
      visible: false,
      passValue: undefined,
    };
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => this.setState({ Dogs: data.message }));

    console.log(this.state.Dogs);
  }

  render() {
    let searchField = this.state.filval;
    console.log("Render called ");
    console.log("Dogs " + JSON.stringify(this.state.Dogs));
    let displayGrid;
    let filterbreed = [];
    let optionMap = [];
    if (this.state.Dogs !== undefined) {
      displayGrid = [];
      _.each(this.state.Dogs, function (v, k) {
        console.log("value " + JSON.stringify(v) + " Key " + k);
        optionMap.push(<option key={k}>{k}</option>);
        console.log("warangal2");
        displayGrid.push(
          <Dogimg
            id={k}
            key={k}
            breed={v}
            alt="good"
            width="100"
            height="100"
          />
        );

        if (
          searchField == undefined ||
          k.toLowerCase().includes(searchField.toLowerCase())
        ) {
          filterbreed.push(
            <Dogimg
              id={k}
              key={k}
              breed={v}
              alt="good"
              width="100"
              height="100"
            />
          );
        }
      });
    } else {
      filterbreed = <div> Fetching data.</div>;
    }

    let imageList;

    if (this.state.passValue !== undefined) {
      imageList = (
        <Imglist num={this.state.bredinval} typebred={this.state.passValue} />
      );
    } else {
      imageList = <h5>wait untill button click...</h5>;
    }

    return (
      <div>
        <div className="headsty">
          <h3 style={{ textAlign: "center", paddingTop: "10px" }}>
            DOG GALLARY
          </h3>
          <button className="btn" onClick={() => this.setState({ disa: true })}>
            Custom Search
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
                <bold>Custom Search</bold>
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

            <div>
              <select
                id="bree"
                name="brees"
                onChange={(e) => this.setState({ bredval: e.target.value })}
                style={{
                  backgroundColor: "lightgrey",
                  padding: "8px 10px",
                  width: "25",
                  float: "left",
                  margin: "50px 20px 20px 200px",
                  outlineStyle: "none",
                }}
              >
                <option value="loding">Select a Breed</option>
                {optionMap}
              </select>
              <input
                type="number"
                value={this.state.weight}
                onChange={(e) => this.setState({ bredinval: e.target.value,passValue:undefined })} 
                required
                id="weight"
                style={{
                  backgroundColor: "lightgrey",
                  padding: "8px 10px",
                  width: "25",
                  float: "right",
                  margin: "50px 200px 20px 20px",
                  outlineStyle: "none",
                }}
                placeholder="Enter number of Images"
              />
            </div>
            <button
              onClick={() => this.setState({passValue: this.state.bredval })}
              className="btn1 "
            >
              GET IMAGES
            </button>

            <div>
              <h5>
                Showing {this.state.bredinval} Images of Breed{" "}
                {this.state.bredval}
              </h5>
              {imageList}
              
            </div>
           
          </Model>
         
        </div>

        <div style={{ textAlign: "center", padding: "20px" }}>
          <input
            type="search"
            placeholder="Enter Breed"
            className=" black input-res"
            onChange={(e) => this.setState({ filval: e.target.value })}
          />
        </div>

        <div className="cardlist">{filterbreed}</div>
      </div>
    );
  }
}

export default App;
