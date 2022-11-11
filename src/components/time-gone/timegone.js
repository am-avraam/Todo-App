import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
export default class TimeGone extends Component {
  static propTypes = {
    dateBirth: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  constructor(props) {
    super(props)
    const { dateBirth } = this.props

    this.state = {
      timeGone: formatDistanceToNow(dateBirth, {
        includeSeconds: true,
        addSuffix: true,
      }),
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      timeGone: formatDistanceToNow(this.props.dateBirth, {
        includeSeconds: true,
        addSuffix: true,
      }),
    })
  }

  render() {
    return <>{this.state.timeGone}</>
  }
}
