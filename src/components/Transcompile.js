import React, { useState, useEffect } from 'react';
import Example1 from './Example1.js';
import grammar from '../small.js';
import { prefunc as fityfunc } from './prefunc.js';
import 가람시 from '../data/weatherData.json';
import { Line } from 'react-chartjs-2';
import chartmaker from './chartmaker';

const nearley = require('nearley');
const generate = require('../generate.js').default;

function Transcompile(props) {
  const [database, setDatabase] = useState([]);
  const [chartdatas, setChartdatas] = useState('');
  const [chartshape, setChartshape] = useState('');
  let data = [];
  let keys;
  let values;
  let labels = '차트제목';
  let shape = '';

  useEffect(() => {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(props.value);
    const parserResult = parser.results;
    if (parserResult[0] !== undefined) {
      const line = generate(parserResult[0][0]);
      const lines = line.concat('\n', fityfunc);
      try {
        let ww = 가람시;
        eval(lines);
      } catch (e) {
        const newerror = reportError(e.message);
        console.info(newerror);
      }
    } else {
      console.info('문법을 다시 확인해보세요');
    }

    function reportError(e) {
      if (e.includes('defined') === true) {
        const newerror = e.replace('is not defined', '는 정의되지 않았습니다.');
        return newerror;
      } else if (e.includes('undefined') === true) {
        const newerror = e.replace('undefined', '바꿨다시발');
        return newerror;
      }
    }
    setChartshape(shape);
    setChartdatas(data);
  }, [props.value]);

  return (
    <>
      {chartmaker(chartshape, chartdatas)}
      {/* <Line data={chartdatas} /> */}
    </>
  );
}
export default React.memo(Transcompile);

/* if (parserResult[0] != undefined) {
      const line = generate(parserResult[0][0]);
      const lines = line.concat('\n', fityfunc);
      eval(lines);
    } else {
      console.log('문법이 다시 살펴보세요(app.js)!');
    } */

/*     setA(`<html>
      <body
      
      </body>
      <script>console.log("a")</script>
    </html>`); */
