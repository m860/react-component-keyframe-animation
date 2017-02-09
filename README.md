# react-component-keyframe-animation

React KeyframeAnimation

<!-- badge -->
[![npm version](https://img.shields.io/npm/v/react-component-keyframe-animation.svg)](https://www.npmjs.com/package/react-component-keyframe-animation)
[![npm license](https://img.shields.io/npm/l/react-component-keyframe-animation.svg)](https://www.npmjs.com/package/react-component-keyframe-animation)
[![npm download](https://img.shields.io/npm/dm/react-component-keyframe-animation.svg)](https://www.npmjs.com/package/react-component-keyframe-animation)
[![npm download](https://img.shields.io/npm/dt/react-component-keyframe-animation.svg)](https://www.npmjs.com/package/react-component-keyframe-animation)
<!-- endbadge -->

<img src='https://raw.githubusercontent.com/m860/react-component-keyframe-animation/master/src/react-component-keyframe-animation-screenshot.gif'>

# Install
```bash
npm install react-component-keyframe-animation --save
```

# Quick Start
```javascript
import KeyframeAnimation from 'react-component-keyframe-animation'

export default class XX extends Component{
	render(){
		return (
			<KeyframeAnimation 
			    name='test'
			    frames={['1.png','2.png','3.png']}></KeyframeAnimation>
		);
	}
}
```
# Props
## name:String.isRequired
设置关键帧动画的名字
## sprite:Object
设置关键帧序列,此方式是以单张图片按照横向或者是纵向连续排列,数据结构如下:
```javascript
{
    source: String.isRequired,			
    direction: String,              // ['row', 'column'] 'row' as default
    frameCount: Number.isRequired   // 
}
```
## frames:String[]
设置关键帧的帧序列
## preload:Boolean=true
是否进行预加载.当组件第一次render完成之后将预加载图片资源
## autoStart:Boolean=true
是否自动播放.如果设置了预加载,之后再预加载完成之后才会执行,否则立即执行
## onStart:Function
动画开始时的事件监听
## onEnd:Function
动画结束时的事件监听
## onIteration:Function
动画迭代完一次时的事件监听
## style:Object
样式设置

# Methods
## Start
开始播放动画
## Stop
停止播放动画

# Examples
## 循环动画示例
```javascript
// 当资源预加载完成之后会进行自动播放
<KeyframeAnimation 
    name='test'
    frames={['1.png','2.png','3.png']}></KeyframeAnimation>
```
