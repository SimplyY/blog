import React, {Component} from 'react'
import { isNodeEnv } from '../../util/common.js'

const SHOW_BIGGER_HEIGHT = 500

class ScrollTopButton extends Component {

    constructor() {
        super()
        this.state = {
            isShow: false
        }
        if (!isNodeEnv()) {
            watchWindowScrolled(this)
        }
    }

    render() {
        if (isNodeEnv() || !this.state.isShow) {
            return (
                <div>
                </div>
            )
        }

        return (
            <div className="scroll-top-button" onClick={scrollTopWithAnimate}>
                <img src="http://7xkpdt.com1.z0.glb.clouddn.com/dad108c160502faf1803921d0f513136.png?imageMogr2/thumbnail/40x/strip/quality/80" alt="scroll to top!" />
            </div>
        )
    }
}

function watchWindowScrolled(that) {
    const WATCH_DELAY = 500

    setTimeout(function() {
        const oldIsShow = that.state.isShow
        if (shouldShow()) {
            if (!oldIsShow) {
                that.setState({isShow: true})
            }
        }
        else {
            if (oldIsShow) {
                that.setState({isShow: false})
            }
        }
        watchWindowScrolled(that)
    }, WATCH_DELAY)
}

function scrollTopWithAnimate() {
    let currentTop = document.body.scrollTop
    const wholeTime = 300
    const stepTime = 10
    const stepsNumber = wholeTime/stepTime
    const stepMove = currentTop/stepsNumber

    ;(function timeLoop(){
        const delay = stepTime
        setTimeout(function() {
            currentTop -= stepMove
            window.scrollTo(0, currentTop)
            if (currentTop > 0) {
                timeLoop()
            }
        }, delay)
    })(stepTime)
}

function shouldShow() {
    const scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset :
        (document.documentElement || document.body.parentNode || document.body).scrollTop

    return document && scrollTop > SHOW_BIGGER_HEIGHT
}

export default ScrollTopButton
