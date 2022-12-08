import { useEffect, useState } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

const TimeGone = ({ dateBirth }) => {
  const [timeGone, setGone] = useState(
    formatDistanceToNowStrict(dateBirth, {
      addSuffix: true,
    })
  )

  const tick = () => {
    setGone(
      formatDistanceToNowStrict(dateBirth, {
        addSuffix: true,
      })
    )
  }

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  })

  return <>{timeGone}</>
}

export default TimeGone
