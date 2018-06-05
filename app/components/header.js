import React from 'react'
import './header.less'
const Header = () => {
  return (
    <div className="component-header row">
      <img src="/static/images/logo.png" width="40" alt="" className="-col-auto"/>
      <h1 className="caption">React音乐播放器</h1>
    </div>
  )
}
export default Header