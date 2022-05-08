import "./styles/main.scss"
import World from './modules/WorldObject'
import Entity from "./modules/EntityObject"
import { distance, resolveCollision } from "./modules/utils"

const world = new World(0.2,0.8)
const c = world.c
world.init()

const circleArr = []
for(let i = 0; i<10; i++){
    let dx = Math.random()*3+i*20
    let dy = Math.random()*3+i*20
    let x = (Math.random()*world.innerWidth-31) + 31
    let y = (Math.random()*world.innerHeight-31) + 31
    let mass = Math.floor(Math.random()*3)+1
    let radius = mass*10+15
    circleArr.push(new Circle(x,y,dx,dy,radius,"white","#aaaaaa",mass))
}

function Circle(x,y,dx,dy,radius,fillColor,strokeColor,mass){

    Entity.call(this,x,y,dx,dy,mass)

    this.radius = radius
    this.xDimension = this.radius
    this.yDimension = this.radius
    this.fillColor = fillColor
    this.strokeColor = strokeColor
   

    this.draw = function (){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,Math.PI*2,false)
        c.fillStyle = fillColor
        c.fill()
        c.strokeStyle = strokeColor
        c.stroke()
    }

    this.update = function (arr){
        world.boundaries(this)
        world.applyGravity(this)
        this.move() //from Entity Object
        for(let i = 0 ; i < arr.length;i++){
            if(this === arr[i])continue
            if(distance(this.x,this.y,arr[i].x,arr[i].y)-(this.radius+arr[i].radius)<0){
                resolveCollision(this,arr[i])
            }
        }
        this.draw()
    }
}


// const circleUp = new Circle(world.innerWidth/2,0,1,1,world.innerWidth/3,"rgb(15, 14, 66)","rgb(15, 14, 66)")
// const circleDown = new Circle(world.innerWidth/2,world.innerHeight,1,1,world.innerWidth/3,"rgb(15, 14, 66)","rgb(15, 14, 66)")
// const circleLeft = new Circle(0,world.innerHeight/2,1,1,world.innerHeight/3,"rgb(15, 14, 66)","rgb(15, 14, 66)")
// const circleRight = new Circle(world.innerWidth,world.innerHeight/2,1,1,world.innerHeight/3,"rgb(15, 14, 66)","rgb(15, 14, 66)")

world.animate(circleArr)


window.addEventListener("click",(ev)=>{
    
    if(distance(ev.clientX,ev.clientY,0,world.innerHeight/2) < world.innerHeight/3){
        world.gravityDirection = "left"
    }
    if(distance(ev.clientX,ev.clientY,world.innerWidth,world.innerHeight/2) < world.innerHeight/3){
        world.gravityDirection = "right"
    }
    if(distance(ev.clientX,ev.clientY,world.innerWidth/2,0) < world.innerWidth/3){
        world.gravityDirection = "up"
    }
    if(distance(ev.clientX,ev.clientY,world.innerWidth/2,world.innerHeight) < world.innerWidth/3){
        world.gravityDirection = "down"
    }
    
})

window.addEventListener("keydown",(ev)=>{

    if(ev.key==="ArrowLeft"){
        world.gravityDirection = "left"
    }
    if(ev.key==="ArrowRight"){
        world.gravityDirection = "right"
    }
    if(ev.key==="ArrowUp"){
        world.gravityDirection = "up"
    }
    if(ev.key==="ArrowDown"){
        world.gravityDirection = "down"
    }
    
})

