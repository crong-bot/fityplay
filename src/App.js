import Editor from './Editor.js';
import React, { useState } from 'react';
import LogsContainer from './components/LogsContainer.js';
import Transcompile from './components/Transcompile.js';
import images from './components/map1.png';
import tree from './components/tree.png';

/* const grammar = require('./small.js'); */

function App() {
  const [code, setCode] = useState('');
  const [ab, setAb] = useState('');

  function sendcode() {
    setAb(code);
  }

  return (
    <>
      <div className="panel">
        <h1 className="title"> fitycode PLAYGROUND</h1>
        <div className="left_pane">
          <button className="run_btn" onClick={sendcode}>
            RUN
          </button>
          <Editor language="python" value={code} onChange={setCode} />
        </div>
        <div className="center_pane">
          <div className="data_pane">
            <Transcompile value={ab} />
          </div>
          <LogsContainer />
        </div>
        <div className="right_pane">
          <img src={images} alt="aa" />
          <img src={tree} alt="aa" />
        </div>
      </div>
    </>
  );
}

export default App;
/*    <iframe
            srcDoc={a}
            title="output"
            frameBorder="0"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          /> */
