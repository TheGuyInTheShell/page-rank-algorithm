const factoryNodes = require('./factory')

class Node {
    constructor(){
        this.val = 0
        this.links = []
    }
}


class PageRank {
    constructor(){
        this.id = 1
        this.realNodes = {}
        this.virtualNodes = {}
    }

    addNode(...linksTo){
        this.realNodes[this.id] = new Node()
        this.realNodes[this.id].links = linksTo
        
        for (const node in this.realNodes) {
            this.realNodes[node].val = 1000/this.id
        }
        this.virtualNodes = structuredClone(this.realNodes)
        this.id++
        return this
    }
    addNodes(nodes){
        return new Promise((res, rej)=>{
            nodes.forEach(node => {
                this.addNode(...node)
            })
            res(this)
        })
    }
    round(){
        for (const node in this.realNodes) {
            this.realNodes[node].val = 0
        }
        for (const vnode in this.virtualNodes) {
            this.virtualNodes[vnode].links.forEach(id => {
                try {
                    this.realNodes[id].val += this.virtualNodes[vnode].val / this.virtualNodes[vnode].links.length
                }
                 catch (error) {
                    console.log(error)
                }
            })
        }
        this.virtualNodes = structuredClone(this.realNodes)
        return this
    }

    rounds(num){
        let i = 0
        return new Promise((res, rej)=>{
            while(i <= num - 1){
                this.round()
                i += 1
            }
            res(this.round())
        })
    }

}

const pageRank = new PageRank()

async function iterator(){
    const resNodes = await factoryNodes(10)
    await pageRank.addNodes(resNodes)
    return await pageRank.rounds(20)

}

setTimeout(()=>{
    console.log('fin timeout')
})

iterator().then(res => {
    console.log(res.realNodes)
})