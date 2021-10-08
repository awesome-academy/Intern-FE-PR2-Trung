import React from 'react'
import { KeyboardArrowLeft } from '@material-ui/icons'
import './styles.scss'

const CirclePreviousBtn = props => {
  const { className, onClick } = props

  return (
    <div className={className} onClick={onClick}>
      <KeyboardArrowLeft fontSize="large" className="circle-previous-btn" />
    </div>
  )
}

export default CirclePreviousBtn
