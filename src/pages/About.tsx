import React from 'react'
import { useHistory } from 'react-router-dom'

const About: React.FC = () => {
  const history = useHistory()
  return (
    <>
      <h1>This is About Page</h1>
      <button className="btn" onClick={() => history.push('/')}>
        Go back to Todo list
      </button>
    </>
  )
}

export default About
