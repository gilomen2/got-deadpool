import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ user, render, location, ...rest }) => {
  return (
    <Route {...rest} render={() => (
      user
        ? render()
        : <Redirect to={{
          pathname: '/',
          state: { from: location }
        }} />
    )} />
  )
}
