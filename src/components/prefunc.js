export const prefunc = `function 화면(...arg) {
        console.log(...arg)
      };
      function 자료(...arg){
       data =[...arg]
      
       const getV = (object, path) =>
       path.reduce((result, key) => (result || {})[key], object)
       let results=getV(ww,data)
       
       
       return results
      }
      function 차트(label,chartdata){
        keys=Object.getOwnPropertyNames(chartdata)
        values=keys.map(e=>chartdata[e])
        labels=label
      }
    `;
