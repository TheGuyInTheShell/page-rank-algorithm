
 function factoryNodes(num){
        let nodes = new Array(num)
        function *generateSome(){
            let i = 0; 
            let temp = null;
            while (i <= nodes.length) {
                temp = new Set()
                let length = Math.random()*nodes.length % nodes.length << 0
                
                while(temp.size < length){
                    temp.add(Math.random()*nodes.length % nodes.length << 0)
                }
                
                yield {i, temp: Array.from(temp)} 
                i++
                }
            }
            return new Promise((res, rej)=>{
                const generatedNode = generateSome()
                let result = generatedNode.next()
                const intervalo = setInterval(()=>{
                if(result.done || result.value.i === nodes.length){
                    res(nodes)
                    clearInterval(intervalo)
                }
                nodes[result.value.i] = result.value.temp
                result = generatedNode.next()
            })
        })
    }

module.exports = factoryNodes