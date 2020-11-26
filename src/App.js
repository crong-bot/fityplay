import Editor from './Editor.js';
import React, { useState, useEffect } from 'react';
import { Console, Hook, Unhook } from 'console-feed';

const nearley = require('nearley');
const grammar = require('./small.js');
const generate = require('./generate.js').default;

function App() {
  const [code, setCode] = useState('');
  /* const [a, setA] = useState(''); */
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const [logs, setLogs] = useState([]);

  const consoleStyles = {
    BASE_BACKGROUND_COLOR: 'none',
    BASE_FONT_SIZE: '1.2rem',
    LOG_ERROR_BACKGROUND: 'rgba(255,0,0,.1)',
    LOG_WARN_BACKGROUND: 'rgba(255,255,0,.1)',
    LOG_INFO_BACKGROUND: 'rgba(0,0,255,.1)',
  };

  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  function CompileandExec() {
    parser.feed(code);
    const parserResult = parser.results;
    const line = generate(parserResult[0][0]);
    const lines = line.concat(
      '\n',
      `function 화면(...arg) {
      console.log(...arg)
    }`
    );
    eval(lines);
    /*     setA(`<html>
      <body
      
      </body>
      <script>console.log("a")</script>
    </html>`); */
  }

  return (
    <>
      <div className="panel">
        <h1 className="title"> fitycode PLAYGROUND</h1>
        <div className="left_pane">
          <button className="run_btn" onClick={CompileandExec}>
            RUN
          </button>
          <Editor language="javascript" value={code} onChange={setCode} />
        </div>
        <div className="right_pane">
          <Console
            logs={logs}
            variant="light"
            filter="Methods[log]"
            styles={consoleStyles}
          />
          {/*    <iframe
            srcDoc={a}
            title="output"
            frameBorder="0"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;
