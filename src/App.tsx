import React, { useEffect, useState } from "react"
import { add, differenceInSeconds } from "date-fns"
import { Container, Row, Button } from "react-bootstrap"

import * as colors from "./colors"
import { convertToDuration, formatInputString } from "./helpers"

function App() {
  // timer in seconds - start with 60 seconds
  const [currentDate, setCurrentDate] = useState(new Date())
  const [timerDuration, setTimerDuration] = useState("00:04:20") // 4:20
  const [finishDate, setFinishDate] = useState(new Date())
  const [isActive, setTimerActive] = useState(false)
  const [isEditing, setTimerEdit] = useState(false)

  useEffect(() => {
    let timer
    if (isActive) {
      timer = setTimeout(() => {
        calculateTimeDifference()
      }, 300)
    } else {
      clearTimeout(timer)
    }
  })

  const resetTimer = (e: React.MouseEvent) => {
    setTimerDuration("00:00:00")
    setTimerActive(false)
  }

  const stopTimer = (e: React.MouseEvent) => {
    setTimerActive(false)
  }

  const startTimer = (e: React.MouseEvent) => {
    if (timerDuration === "00:00:00") {
      return
    }

    setTimerActive(true)
    const [hours, minutes, seconds] = timerDuration.split(":")

    const currentDate = new Date()

    const finishDate = add(currentDate, {
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    })
    setFinishDate(finishDate)
  }

  const handleInputChange = (value: string) => {
    const splitString = value.split(":")

    // prevent the user from deleting any colons ":"
    const isFormatValid = splitString.length === 3

    if (!isFormatValid) {
      return
    }

    const timerDurationString = formatInputString(value)

    setTimerDuration(timerDurationString)
  }

  const calculateTimeDifference = () => {
    const updatedCurrentDate = new Date()
    setCurrentDate(updatedCurrentDate)
    const diffInSeconds = differenceInSeconds(finishDate, currentDate)
    const timeLeft = convertToDuration(diffInSeconds)
    setTimerDuration(timeLeft)
  }

  const buttonStyle = { margin: "8px" }
  return (
    <Container fluid>
      <Row>
        <div
          style={{ background: colors.text, padding: "2rem", width: "100%" }}
        >
          <h1 style={{ color: colors.textLight, textAlign: "center" }}>
            Timer App
          </h1>
        </div>
      </Row>
      <Row style={{ marginTop: "2em" }}>
        <div
          style={{
            maxWidth: "960px",
            width: "100%",
            margin: "12px auto",
            textAlign: "center",
          }}
        >
          {isEditing ? (
            <input
              type="string"
              onChange={(e) => handleInputChange(e.target.value)}
              onBlur={() => setTimerEdit(false)}
              value={timerDuration}
            />
          ) : (
            <h3 onClick={() => !isActive && setTimerEdit(true)}>
              {timerDuration}
            </h3>
          )}
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Button
              disabled={timerDuration === "00:00:00"}
              style={buttonStyle}
              variant="primary"
              onClick={startTimer}
            >
              Start
            </Button>
            <Button style={buttonStyle} variant="danger" onClick={stopTimer}>
              Stop
            </Button>
            <Button style={buttonStyle} variant="light" onClick={resetTimer}>
              Reset
            </Button>
          </Row>
        </div>
      </Row>
    </Container>
  )
}

export default App
