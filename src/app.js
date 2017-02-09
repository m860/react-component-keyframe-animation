require('./app.sass')
import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import KeyframeAnimation from './keyframe-animation'

class App extends Component {
	static propTypes = {
		children: PropTypes.any
		, location: PropTypes.any
	}

	constructor(props){
		super(props);
		this.state={

		};
	}

	render() {
		return (
			<div id="app">
				
			</div>
		);
	}
}

ReactDOM.render(
	<App></App>
	, document.getElementById("view"));