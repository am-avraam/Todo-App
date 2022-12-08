import { useEffect, useState } from 'react'

const Timer = ({ timer: time }) => {
  // форматирует значение таймера при его первом появлении
  const toAppear = (indicator) => {
    if (!indicator) {
      return '00'
    } else if (indicator && indicator.length < 2) {
      return `0${indicator}`
    } else return indicator
  }

  const [timer, setTimer] = useState(`${toAppear(time[0])}:${toAppear(time[1])}`)
  const [timerId, setTimerId] = useState('')
  const [timerFromZero, setZero] = useState(false)

  // очищает id интервала и обнуляет предназначенный для него state
  const resetTimerId = () => {
    clearInterval(timerId)
    setTimerId('')
  }

  const parseTime = (duration) => {
    let timing = 0
    duration = duration.split(':')
    parseInt(duration[0]) ? (timing += +duration[0] * 60) : (timing += 0)
    parseInt(duration[1]) ? (timing += +duration[1]) : (timing += 0)
    return timing
  }

  // таймер от нуля
  const fromZero = () => {
    let timerId

    let start = parseTime(timer) ? new Date(0, 0, 0, 0, 0, 0, parseTime(timer) * 1000) : new Date(0, 0, 0, 0, 0, 0, 0)

    const update = () => {
      start.setSeconds(start.getSeconds() + 1)

      let minutes = start.getMinutes()
      if (minutes < 10) minutes = '0' + minutes

      let seconds = start.getSeconds()
      if (seconds < 10) seconds = '0' + seconds

      setTimer(`${minutes}:${seconds}`)
    }

    timerId = setInterval(update, 1000)

    setTimerId(timerId)
    setZero(true)
  }

  // при нажатии "play" запускает определенный вид таймера (в зависимости от (не)заданного времени).
  // при нажатии "pause" очищает интервал, останавливает таймер, сохраняя оставшийся тайминг.
  const toggleTimer = (e) => {
    if (e.target.className == 'icon icon-pause') {
      resetTimerId()
      return
    } else if (timerId) return

    // для таймера обратного отсчета

    // значение таймера из state делится на два элемента массива для дальнейшей обработки значения
    let duration = timer.split(':')

    let timing = 0
    // парсим числовое значение каждого элемента массива
    parseInt(duration[0]) ? (timing += +duration[0] * 60) : (timing += 0)
    parseInt(duration[1]) ? (timing += +duration[1]) : (timing += 0)

    if (!timing || timerFromZero) {
      fromZero()
      return
    }
    let start = Date.now(),
      diff,
      minutes,
      seconds,
      interval

    const timerGo = () => {
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

      setTimer(`${minutes}:${seconds}`)

      if (diff <= 0) {
        // добавляем секунду, чтобы обратный отсчет начался с полной продолжительности,
        // 5:00, а не 4:59, например
        start = Date.now() + 1000
      }
    }
    // чтобы не ждать секунду до запуска таймера
    timerGo()
    interval = setInterval(timerGo, 1000)

    setTimerId(interval)
  }

  useEffect(() => () => resetTimerId(), [])

  return (
    <span className="description">
      <button onClick={(e) => toggleTimer(e)} className="icon icon-play"></button>
      <button onClick={(e) => toggleTimer(e)} className="icon icon-pause"></button>
      {timer}
    </span>
  )
}

export default Timer
