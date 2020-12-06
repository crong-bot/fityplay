import React, { useState, useEffect } from 'react';
import Example1 from './Example1.js';
import grammar from '../small.js';
import { prefunc as fityfunc } from './prefunc.js';
import 가람시 from '../data/weatherData.json';
import { Line } from 'react-chartjs-2';

const nearley = require('nearley');
const generate = require('../generate.js').default;

function Transcompile(props) {
  const [database, setDatabase] = useState([]);
  const [chartdatas, setChartdatas] = useState('');
  let data = [];
  let keys;
  let values;
  let labels = '차트제목';

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
    setChartdatas({
      labels: keys,
      datasets: [
        /* {
          label: 'First dataset',
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
        }, */
        {
          label: labels,
          data: values,
          fill: false,
          borderColor: '#742774',
        },
      ],
    });
  }, [props.value]);

  return (
    <>
      <Line data={chartdatas} />
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