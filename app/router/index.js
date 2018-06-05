import React from 'react'
// import { render } from 'react-dom'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './root' 

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}
render(Root)
// 实现热更新
if(module.hot) {
  module.hot.accept('./root', () => {
    render(Root)
  })
}