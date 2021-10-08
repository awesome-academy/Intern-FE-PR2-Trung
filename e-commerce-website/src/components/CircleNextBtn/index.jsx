import React from 'react'
import { KeyboardArrowRight } from '@material-ui/icons'
import './styles.scss'

const CircleNextBtn = props => {
  const { className, onClick } = props

  return (
    <div className={className} onClick={onClick}>
      <KeyboardArrowRight fontSize="large" className="circle-next-btn" />
    </div>
  )
}

export default CircleNextBtn
