import React from 'react'
import PubSub from 'pubsub-js'
import './musiclistitem.less'
class MusicListItem extends React.Component {
  constructor (props) {
    super(props)
  }
  palyMusic (musicItem) {
    // 通过发布事件来让订阅者能够检测到
    PubSub.publish('PLAY_MUSIC', musicItem)
  }
  deleteMusic (musicItem, e) {
    e.stopPropagation();
    PubSub.publish('DEL_MUSIC', musicItem)
  }
  render () {
    let musicItem = this.props.musicItem
    return (
      <li onClick={this.palyMusic.bind(this, musicItem)} className={`components-listitem row ${this.props.focus ? 'focus' : ''}`}>
        <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
        <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
      </li>
    )
  }
}
export default MusicListItem