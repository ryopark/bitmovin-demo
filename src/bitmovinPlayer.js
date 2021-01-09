import React from 'react';
import { Player } from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import 'bitmovin-player/bitmovinplayer-ui.css';
import { detect } from 'detect-browser';
const browser = detect();
class BitmovinPlayer extends React.Component {

    state = {
        player: null,
    };

    playerConfig = {
        key: '1b41efb4-6d43-4a25-a76f-da64815a6b0b'
    };

    playerSource = () => {
        const source = {
            dash: '//bitmovin-a.akamaihd.net/webpages/demos/content/multi-codec/h264/stream.mpd',
            poster: 'images/comparison.jpg'
        };
        if (browser.name === 'chrome' || browser.name === 'firefox') {
            source.dash = '//bitmovin-a.akamaihd.net/webpages/demos/content/multi-codec/vp9/stream.mpd';
        } else if (browser.name === 'edge') {
            source.dash = '//bitmovin-a.akamaihd.net/webpages/demos/content/multi-codec/hevc/stream.mpd';
        } else if (browser === 'safari') {
            source.hls = '//bitmovin-a.akamaihd.net/webpages/demos/content/multi-codec/hevc/stream_fmp4.m3u8';
        }
        return source
    }

    constructor(props) {
        super(props);
        this.playerDiv = React.createRef();
    }

    componentDidMount() {
        this.setupPlayer();
    }

    componentWillUnmount() {
        this.destroyPlayer();
    }

    setupPlayer() {
        const player = new Player(this.playerDiv.current, this.playerConfig);
        UIFactory.buildDefaultUI(player);
        player.load(this.playerSource()).then(() => {
            this.setState({
                ...this.state,
                player
            });
            console.log('Successfully loaded source');
        }, () => {
            console.log('Error while loading source');
        });
    }

    destroyPlayer() {
        if (this.state.player != null) {
            this.state.player.destroy();
            this.setState({
                ...this.state,
                player: null
            });
        }
    }

    render() {
        return <div id='player' ref={this.playerDiv}/>;
    }
}

export default BitmovinPlayer;
