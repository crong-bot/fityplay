import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import { Controlled as ControlledEditor } from 'react-codemirror2';

function Editor(props) {
  const { language, value, onChange } = props;
  function handlechange(editor, data, value) {
    onChange(value);
  }
  return (
    <>
      <div className="editor_container">
        <ControlledEditor
          className="editor"
          onBeforeChange={handlechange}
          value={value}
          options={{
            lint: true,
            lineNumbers: true,
            mode: language,
            lineWrapping: true,
            theme: 'dracula',
          }}
        />
      </div>
    </>
  );
}

export default Editor;
