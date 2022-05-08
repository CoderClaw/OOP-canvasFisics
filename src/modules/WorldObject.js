export default function World(gravity,friction){

    // Properties

    this.canvas = document.querySelector("canvas");
    this.c = this.canvas.getContext("2d");
    this.innerHeight = window.innerHeight;
    this.innerWidth = window.innerWidth;
    this.mousePosition = {}
    this.gravity = gravity
    this.gravityDirection = "down"
    this.friction = friction


    //init
    this.init = function () {
        //canvas size
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        //mouse location
        window.addEventListener("mousemove", (ev) => {
            this.mousePosition.x = ev.clientX;
            this.mousePosition.y = ev.clientY;
          });
        // resize window
        window.addEventListener("resize", () => {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.innerWidth = window.innerWidth;
        });
    }
    
    this.boundaries = function (item) {
        if(item.x + item.xDimension + item.velocity.x >= this.innerWidth 
            || 
            item.x - item.xDimension + item.velocity.x <= 0){
             item.velocity.x *= -1 * this.friction
             item.velocity.y *= 1 * 0.95
            }

        if(item.y + item.yDimension + item.velocity.y >= this.innerHeight 
            || 
            item.y - item.yDimension + item.velocity.y <= 0  ) {
              item.velocity.y *= -1 * this.friction
              item.velocity.x *= 1 * 0.95
            }
    }

    this.applyGravity = function (item){
        switch(this.gravityDirection){
            case "right":
                if(item.x + item.xDimension + item.velocity.x < this.innerWidth)item.velocity.x+=this.gravity
                break
            case "down":
                if(item.y + item.yDimension + item.velocity.y < this.innerHeight)item.velocity.y+=this.gravity
                break
            case "up":
                if(item.y - item.yDimension + item.velocity.y > 0)item.velocity.y-=this.gravity
                break
            case "left":
                if(item.x - item.xDimension + item.velocity.x > 0)item.velocity.x-=this.gravity
                break
            default:
                //no gravity
                break
        }
        
    }

    this.animate =  (arr) => {
        requestAnimationFrame(()=>this.animate(arr))
        this.c.clearRect(0,0,this.innerWidth,this.innerHeight)
        arr.forEach((item)=>{
            item.update(arr)})
    }

    
}

