import React from 'react'
import Progress from '../components/progress'
import { Link } from 'react-router'
import PubSub from 'pubsub-js'
import './player.less'
let duration = null
class Player extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: 0,
      volume: 0,
      isPlay: true,
      isVolume: true,
      leftTime: null
    }
    this.handleChangeProgress = this.handleChangeProgress.bind(this)
    this.handleVolume = this.handleVolume.bind(this)
    this.playVideo = this.playVideo.bind(this)
  }
  componentDidMount () {
    $('#player').bind($.jPlayer.event.timeupdate, (e) => {
      duration = e.jPlayer.status.duration
      this.setState({
        progress: e.jPlayer.status.currentPercentAbsolute,
        volume: e.jPlayer.options.volume * 100,
        leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsoute / 100))
      })
      $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause')
    })
  }
  componentWillUnmount () {
    $('#player').unbind($.jPlayer.event.timeupdate)
  }
  formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}
  handleChangeProgress (progress) {
    // console.log('父组件接受的', progress)
    $('#player').jPlayer('play', duration * progress)
  }
  handleVolume (progress) {
    // console.log('音量', progress)
    $('#player').jPlayer('volume', progress)
  }
  playVideo () {
    if (this.state.isPlay) {
      $('#player').jPlayer('pause')
    } else {
      $('#player').jPlayer('play')
    }
    this.setState(pre => ({
      isPlay: !pre.isPlay
    }))
  }
  playPrev () {
    PubSub.publish('PLAY_PREV')
  }
  playNext () {
    PubSub.publish('PLAY_NEXT')
  }
  render () {
    let item = this.props.currentMusicItem
    return (
      <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
          <div className="mt20 row">
            <div className="controll-wrapper">
              <h2 className="music-title">{item.title}</h2>
              <h3 className="music-artist mt10">{item.artist}</h3>
              <div className="row mt20">
                <div className="left-time -col-auto">{this.state.leftTime}</div>
                <div className="volume-container">
                  <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                  <div className="volume-wrapper">
                    {/* 音量控制部分 */}
                    <Progress
                    colorBar="#ff0000"
                    progress={this.state.volume}
                    onHandleClickProgress={this.handleVolume}
                    />
                  </div>
                </div>
              </div>
              <div style={{height: 10, lineHeight: '10px'}}>
                {/* 进度控制部分 */}
                <Progress
                colorBar="#2f9842"
                progress={this.state.progress}
                onHandleClickProgress={this.handleChangeProgress}
                />
              </div>
              <div className="mt35 row">
                <div>
                  <i className="icon prev" onClick={this.playPrev.bind(this)}></i>
                  <i className={`icon ml20 ${this.state.isPlay ? 'pause': 'play'}`} onClick={this.playVideo}></i>
                  <i className="icon next ml20" onClick={this.playNext.bind(this)}></i>
                </div>
                <div className="-col-auto">
                  <i className="icon repeat-cycle"></i>
                </div>
              </div>
            </div>
            <div className="-col-auto cover">
              <img src={item.cover} alt={item.title}/>
            </div>
          </div>
      </div>
    )
  }
}
export default Player