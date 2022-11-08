import React, { Component } from "react";
import { formatDistanceToNow } from "date-fns";

export default class TimeGone extends Component {
  constructor(props) {
    super(props);
    const { dateBirth } = this.props;

    this.state = {
      timeGone: formatDistanceToNow(dateBirth, {
        includeSeconds: true,
      }),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      timeGone: formatDistanceToNow(this.props.dateBirth, {
        includeSeconds: true,
      }),
    });
  }

  render() {
    return <>{this.state.timeGone}</>;
  }
}
