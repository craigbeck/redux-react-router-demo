/* jshint esnext:true */
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentWillMount() {
    this._tid = setInterval(() => this.setState({ time: new Date() }), 50);
  }

  render() {
    let time = new Date();
    return (
      <div>
        <h1>Hello Webpack!</h1>
        <div>{this.state.time.toString()}</div>
      </div>
    );
  }
}

export default App;
