import { LinearProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  linearProgress: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0
  }
}))

function Loading(props) {
  const classes = useStyles()
  const { loading } = useSelector(state => state.app)

  if (loading === true) {
    return (
      <LinearProgress color="secondary" className={classes.linearProgress} />
    )
  }

  return null
}

export default Loading
