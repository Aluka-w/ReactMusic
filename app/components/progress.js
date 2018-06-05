import React from 'react'
import './progress.less'
class Progress  extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      progress: this.props.progress
    }
    this.handleClickProgress = this.handleClickProgress.bind(this)
  }
  handleClickProgress (e) {
    let progressRef = this.refs.progressRef;
		let percent = (e.clientX - progressRef.getBoundingClientRect().left) / progressRef.clientWidth;
    // console.log('百分比', percent)
    this.setState({
      progress: percent
    })
    this.props.onHandleClickProgress && this.props.onHandleClickProgress(percent)
  }
  render () {
    let styleObj = {
      width: `${Math.round(this.state.progress * 100)}%`,
      backgroundColor: this.props.colorBar
    }
    return (
      <div className="component-progress row" ref="progressRef" onClick={this.handleClickProgress}>
         <div className="progress" style={styleObj}>
         </div>
      </div>
    )
  }
}
export default Progress