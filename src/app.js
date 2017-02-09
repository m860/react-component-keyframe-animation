require('./app.sass')
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import KeyframeAnimation from './keyframe-animation'

class App extends Component {
	static propTypes = {
		children: PropTypes.any
		, location: PropTypes.any
	}

	constructor(props) {
		super(props);
		this.frames = [
			require('./kf/1.png')
			, require('./kf/2.png')
			, require('./kf/3.png')
			, require('./kf/4.png')
			, require('./kf/5.png')
			, require('./kf/6.png')
			, require('./kf/7.png')
			, require('./kf/8.png')
			, require('./kf/9.png')
			, require('./kf/10.png')
			, require('./kf/11.png')
			, require('./kf/12.png')
			, require('./kf/13.png')
			, require('./kf/14.png')
		];
		this.state = {};
	}

	render() {
		return (
			<div id="app">
				<KeyframeAnimation name="test"
								   frames={this.frames}
								   autoStart={true}
								   onStart={()=>{
								   	   console.log('start');
								   }}
								   onEnd={()=>{
								   	   console.log('end')
								   }}
								   onIteration={()=>{
								   	   console.log('iteration');
								   }}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App></App>
	, document.getElementById("view"));