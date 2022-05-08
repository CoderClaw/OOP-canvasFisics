
export default function Entity(x,y,dx,dy,mass){

    this.x = x;
    this.y = y;
    this.velocity = {
        x: dx,
        y: dy
    }
    this.mass = mass

    this.move = function (){
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        
    }
}