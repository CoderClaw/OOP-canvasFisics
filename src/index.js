import "./styles/main.scss"
import World from './modules/WorldObject'
import Entity from "./modules/EntityObject"

const world = new World(0.5,0.8)
const c = world.c
world.init()


function Circle(x,y,dx,dy,radius){

    Entity.call(this,x,y,dx,dy)

    this.radius = radius
    this.xDimension = this.radius
    this.yDimension = this.radius

    this.draw = function (){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,Math.PI*2,false)
        c.fillStyle = "white"
        c.fill()
    }

    this.update = function (){
        world.boundaries(this)
        world.applyGravity(this)
        this.move() //from Entity Object
        this.draw()
    }
}



const circleArr = []
for(let i = 0; i<10; i++){
    let dx = Math.random()*3+2
    let dy = Math.random()*3+2
    circleArr.push(new Circle(30,30,dx,dy,30))
}

world.animate(circleArr)



window.addEventListener("click",()=>{
    circleArr.forEach(item=>{
        item.y = Math.random()*100+50
        item.x = Math.random()*(world.innerWidth - (item.radius +30)*2)+item.radius +30
        item.dx = Math.random()*4-2
    })
    console.log("click")
})