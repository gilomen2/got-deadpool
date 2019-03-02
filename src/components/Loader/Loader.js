import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import './Loader.scss'

export const Loader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className={'loading-screen'}>
        <CircularProgress color='secondary' />
      </div>
    )
  } else {
    return <span />
  }
}
