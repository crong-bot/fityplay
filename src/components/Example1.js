import React, { useEffect, useState, useRef } from 'react';
import 가람시 from '../data/weatherData.json';

function Example1(props) {
  const [data, setData] = useState();

  const firstRun = useRef(true);

  useEffect(() => {
    // skip the first run
    /*  if (firstRun.current) {
      firstRun.current = false;
      return;
    } */
    let a = props.value;
    const getV = (object, path) =>
      path.reduce((result, key) => (result || {})[key], object);
    if (a != 0) {
      let json;
      json = 가람시;
      const results = getV(json, a);
      setData(results);
      console.log(results);
    }
  }, [props.value]);

  /* useEffect(() => {
    let a = [...props.value];
    const getV = (object, path) =>
      path.reduce((result, key) => (result || {})[key], object);
    const results = getV(b, a);
    setData(results);
  }, [data]); */

  return <div>{data}</div>;
}
export default React.memo(Example1);
