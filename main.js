class Grafics2d {
  constructor(xmin = -10, xmax = 10, ymin = -10,
              ymax = 10, W = 512, H = 512) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.W = W;
    this.H = H;
    this.F = function (x, y) {
      return x * x + y * y - 81;
    }
    this.Float64Array = new Float64Array(this.W * this.H);
  }
  evaluate() {
    let dx = (this.xmax - this.xmin) / this.W;
    let dy = (this.ymax - this.ymin) / this.H;
    let i = 0;
    for(let x = this.xmin; x <= this.xmax; x += dx) {
      for(let y = this.ymin; y <= this.ymin; y += dy) {
        this.Float64Array[i] = this.F(x, y);
      }
    }
  }
  draw(funplus = 'red', funminus = 'blue', axis = 'green') {
    let dx = (this.xmax - this.xmin) / this.W;
    let dy = (this.ymax - this.ymin) / this.H;
    let S1 = this.W / (this.xmax - this.xmin);
    let S2 = this.H / (this.ymin - this.ymax);

    const canvas = document.getElementById('canvas');
    canvas.height = this.H;
    canvas.width = this.W;
    const ctx = canvas.getContext('2d');
    let ImgData = ctx.getImageData(0, 0, this.W, this.H);
    let RGBA = ImgData.data;
    ctx.strokeRect(0, 0, this.W, this.H);

    let X = 0;
    let Y = 0;
    for(let p=0; p < this.W*this.H*4; p+=4) {
      let x = (X-this.W)*dx+this.xmax;
      let y = (Y-this.H)*dy+this.ymax;
      const thx = 1/256;
      const thy = 1/256;
      let axisX = Math.abs(x) < thx;
      let axisY = Math.abs(x) < thy;
      let axes = (axisX+axisY)*64;
      let vertGrid = Math.abs(x%1) < thx;
      let gorGrid = Math.abs(y%1) < thy;
      let grid = (vertGrid+gorGrid)*64;
      let AG = axes+grid;
      let Fun = this.F(x, y);
      let a = Math.abs(Fun);
      let F1 = 1024*20*1/(100+a);
      if(Fun>0) RGBA[0] = Fun;
      else if(Fun<0) RGBA[2] = -Fun;
      RGBA[1] = AG;
      RGBA[3] = 255;
      X++;
      if(X==this.W) {
        X=0;
        Y++;
      }
    }
    ctx.putImageData(ImgData, 0, 0);
  }
}
let grafic = new Grafics2d();
grafic.evaluate();
grafic.draw();

