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
      function 막대그래프(chartdata,label='그래프'){
        keys=Object.getOwnPropertyNames(chartdata)
        values=keys.map(e=>chartdata[e])
        labels=label
        shape='막대그래프'       
      }
      function 꺽은선그래프(chartdata,label='그래프'){
        keys=Object.getOwnPropertyNames(chartdata)
        values=keys.map(e=>chartdata[e])
        labels=label
        shape='꺽은선그래프'       
      }
      function 원그래프(chartdata,label='그래프'){
        keys=Object.getOwnPropertyNames(chartdata)
        values=keys.map(e=>chartdata[e])
        labels=label
        shape='원그래프'       
      }
      function 믹서기(...arg){
        let mixerinput =[...arg]    
        if(mixerinput.length == 2){
          return '🍷' 
        }else if(mixerinput.length > 2){
          return '🍹' 
        }else if(mixerinput.length == 1){
          return '🥤'
        }
      }
    `;
