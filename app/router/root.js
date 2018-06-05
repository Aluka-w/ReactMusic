import React from 'react'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import Header from '../components/header'
import Player from '../page/player'
import MusicList from '../page/musiclist'
import {MUSIC_LIST} from '../config/config.js'
import PubSub from 'pubsub-js'
import MusicListItem from '../components/musiclistitem';
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentMusicItem: MUSIC_LIST[0],
      musiclist: MUSIC_LIST
    }
  }
  playMusic (item) {
    $('#player').jPlayer('setMedia', {
      mp3: item.file
    }).jPlayer('play')
    this.setState({
      currentMusicItem: item
    })
  }
  playNext (type="next") {
    let index = this.findMusicIndex(this.state.currentMusicItem)
    let newIndex = null
    let musicListLength = this.state.musiclist.length
    if (type === 'next') {
      newIndex = (index + 1) % musicListLength
    } else {
      newIndex = (index - 1 + musicListLength) % musicListLength
    }
    this.playMusic(this.state.musiclist[newIndex])
  }
  findMusicIndex (musicItem) {
    return this.state.musiclist.indexOf(musicItem)
  }
  componentDidMount () {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    })
    this.playMusic(this.state.currentMusicItem)
    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext()
    })
    PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      // 事件订阅
      this.playMusic(musicItem)
    })
    PubSub.subscribe('DEL_MUSIC', (msg, musicItem) => {
      this.setState({
        musiclist: this.state.musiclist.filter(item => {
          return item !== musicItem
        })
      })
    })
    PubSub.subscribe('PLAY_PREV', (msg) => {
      this.playNext('prev')
    })
    PubSub.subscribe('PLAY_NEXT', (msg) => {
      this.playNext('next')
    })
  }
  componentWillUnmount () {
    // 绑定了记得需要解绑
    PubSub.unsubscribe('PLAY_MUSIC')
    PubSub.unsubscribe('DEL_MUSIC')
    $('#player').unbind($.jPlayer.event.ended)
    PubSub.unsubscribe('PLAY_PREV')
    PubSub.unsubscribe('PLAY_NEXT')
  }
  render () {
    return (
      <div>
        <Header />
        {
          React.cloneElement(this.props.children, this.state)
        }
        {/* <Player 
        currentMusicItem={this.state.currentMusicItem}
        /> */}
        {/* <MusicList 
        currentMusicItem={this.state.currentMusicItem}
        musiclist={this.state.musiclist}
        /> */}
      </div>
    )
  }
}
function Root (props) {
  return(
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Player}></IndexRoute>
        <Route path="/list" component={MusicList}></Route>
      </Route>
    </Router>
  )
}
export default Root