
export default function Entity(x,y,dx,dy){

    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;

    this.move = function (){
        this.x += this.dx;
        this.y += this.dy;
        
    }
}