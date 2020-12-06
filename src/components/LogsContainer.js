import React, { useState, useEffect } from 'react';
import { Console, Hook, Unhook } from 'console-feed';

const LogsContainer = () => {
  const [logs, setLogs] = useState([]);

  const consoleStyles = {
    BASE_BACKGROUND_COLOR: 'none',
    BASE_FONT_SIZE: '1.2rem',
    LOG_ERROR_BACKGROUND: 'rgba(255,0,0,.1)',
    LOG_WARN_BACKGROUND: 'rgba(255,255,0,.1)',
    LOG_INFO_BACKGROUND: 'rgba(0,0,255,.1)',
  };
  // run once!
  useEffect(() => {
    Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(window.console);
  }, []);

  return (
    <>
      <Console
        logs={logs}
        variant="dark"
        filter="Methods[log,info]"
        styles={consoleStyles}
        searchKeywords=""
      />
    </>
  );
};

export default LogsContainer;
