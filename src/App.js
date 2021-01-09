import './App.css';
import browserImg from './browser-img.png';
import cal from './calculation.png';

import BitmovinPlayer from './bitmovinPlayer';
import { detect } from 'detect-browser';
const browser = detect();
function App() {
  const detectedCodecImg = () => {
    if (browser.name === 'chrome' || browser.name === 'firefox') {
      return 'V9'
    } else if (browser.name === 'edge') {
      return 'H265'
    } else if (browser.name === 'safari') {
      return 'H264'
    }
    return null 
  }
  return (
<>
<div>
    <div class="row">
        <div class="col-lg-6 player-col mt-3">
            <img src={browserImg}  />
        </div>
        <div class="col-lg-6 player-col mt-3">
            <img src={cal}  />
        </div>
    </div>
    <div class="row mt-5">
        <div class="col-lg-6 player-col">
            <p>Detected <span id="detected-browser">{browser.name}</span>, using <span class="selected-codec">{detectedCodecImg()}</span></p>
            <div className='content'>
              <div id='player-wrapper'>
                  <BitmovinPlayer />
              </div>
            </div>
        </div>
    </div>
</div>
</>
  );
}

export default App;
