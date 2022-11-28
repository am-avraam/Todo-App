import { Component } from 'react'

// import './Timer.css'

export default class Timer extends Component {
  // форматирует значение таймера при его первом появлении
  toAppear = (indicator) => {
    if (!indicator) {
      return '00'
    } else if (indicator && indicator.length < 2) {
      return `0${indicator}`
    } else return indicator
  }

  // очищает id интервала и обнуляет предназначенный для него state
  resetTimerId = () => {
    clearInterval(this.state.timerId)
    this.setState({ timerId: '' })
  }

  state = {
    timer: `${this.toAppear(this.props.timer[0])}:${this.toAppear(this.props.timer[1])}`,
    timerId: '',
    fromZero: false,
  }

  // парсит и возвращает значение пройденного таймера
  parseTime = (duration) => {
    let timing = 0
    duration = duration.split(':')
    parseInt(duration[0]) ? (timing += +duration[0] * 60) : (timing += 0)
    parseInt(duration[1]) ? (timing += +duration[1]) : (timing += 0)
    return timing
  }

  // таймер от нуля
  fromZero = () => {
    let timerId

    let start = this.parseTime(this.state.timer)
      ? new Date(0, 0, 0, 0, 0, 0, this.parseTime(this.state.timer) * 1000)
      : new Date(0, 0, 0, 0, 0, 0, 0)

    const update = () => {
      start.setSeconds(start.getSeconds() + 1)

      let minutes = start.getMinutes()
      if (minutes < 10) minutes = '0' + minutes

      let seconds = start.getSeconds()
      if (seconds < 10) seconds = '0' + seconds

      this.setState(() => {
        return { timer: `${minutes}:${seconds}` }
      })
    }

    timerId = setInterval(update, 1000)
    this.setState({
      timerId: timerId,
      fromZero: true,
    })
  }

  // при нажатии "play" запускает определенный вид таймера (в зависимости от (не)заданного времени).
  // при нажатии "pause" очищает интервал, останавливает таймер, сохраняя оставшийся тайминг.
  toggleTimer = (e) => {
    if (e.target.className == 'icon icon-pause') {
      this.resetTimerId()
      return
    } else if (this.state.timerId) return

    // для таймера обратного отсчета

    // значение таймера из state делится на два элемента массива для дальнейшей обработки значения
    let duration = this.state.timer.split(':')

    let timing = 0
    // парсим числовое значение каждого элемента массива
    parseInt(duration[0]) ? (timing += +duration[0] * 60) : (timing += 0)
    parseInt(duration[1]) ? (timing += +duration[1]) : (timing += 0)

    if (!timing || this.state.fromZero) {
      this.fromZero()
      return
    }
    let start = Date.now(),
      diff,
      minutes,
      seconds,
      interval

    const timer = () => {
      let end = false
      // получаем кол-во секунд, прошедших с момента вызова stateTimer()
      diff = timing - (((Date.now() - start) / 1000) | 0)

      // что и parseInt, усекаем 'плавающее' значение
      minutes = (diff / 60) | 0
      seconds = diff % 60 | 0
      // если значение минут и секунд = 0, выставляем флаг end
      if (!minutes && !seconds) end = true

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      // флаг end служит индикатором для очистки интервала
      if (end && interval) clearInterval(interval)

      this.setState(() => {
        return { timer: `${minutes}:${seconds}` }
      })

      if (diff <= 0) {
        // добавляем секунду, чтобы обратный отсчет начался с полной продолжительности,
        // 5:00, а не 4:59, например
        start = Date.now() + 1000
      }
    }
    // чтобы не ждать секунду до запуска таймера
    timer()
    interval = setInterval(timer, 1000)

    this.setState({
      timerId: interval,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId)
  }

  render() {
    return (
      <span className="description">
        <button onClick={(e) => this.toggleTimer(e)} className="icon icon-play"></button>
        <button onClick={(e) => this.toggleTimer(e)} className="icon icon-pause"></button>
        {this.state.timer}
      </span>
    )
  }
}
