/* jshint esnext:true */
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div>{this.props.children}</div>
      </header>
    );
  }
}

import "./app.scss";
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

  componentWillUnmount() {
    if (this._tid) {
      clearInterval(this._tid);
      delete this._tid;
    }
  }

  render() {
    let time = new Date();
    return (
      <div>
        <Header>Hello Webpack!</Header>
        <div>{this.state.time.toString()}</div>
      </div>
    );
  }
}

export default App;
