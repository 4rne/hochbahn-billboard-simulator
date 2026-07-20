var PIXEL_WIDTH = 200
var PIXEL_HEIGHT = 64
var SCALING_FACTOR = 8
var BIT_DEPTH = 2
var INTS_PER_COLUMN = PIXEL_HEIGHT / 32 * BIT_DEPTH

let pixelData = new Array(PIXEL_WIDTH)
let color_yellow
let color_green
let color_red
let color_off

function setup() {
  noLoop();
  this.color_off = color(50)
  this.color_red = color(170, 50, 50)
  this.color_green = color(50, 170, 50)
  this.color_yellow = color(170, 170, 50)

  for(let i = 0; i < PIXEL_WIDTH; i++) {
    pixelData[i] = new Array(INTS_PER_COLUMN)
    for(let j = 0; j < INTS_PER_COLUMN; j++) {
      pixelData[i][j] = 0
    }
  }
  createCanvas(PIXEL_WIDTH * SCALING_FACTOR + 2 * SCALING_FACTOR, PIXEL_HEIGHT * SCALING_FACTOR + 2 * SCALING_FACTOR)
  background(20);

  this.setLine("", 0, 1)
  this.addDivider(20, 0, 1)
  this.addDivider(PIXEL_HEIGHT - 14, 0, 1)

  this.render();
}
 
function draw() {
  
}

function render() {
  stroke(50)
  strokeWeight(SCALING_FACTOR * 0.75);
  for(let i = 0; i < PIXEL_WIDTH; i++) {
    for(let j = 0; j < PIXEL_HEIGHT; j++) {
      let pixel = getPixel(i, j)
      let posX = SCALING_FACTOR * i + SCALING_FACTOR
      let posY = SCALING_FACTOR * j + SCALING_FACTOR
      if(pixel[0] > 0 && pixel[1] > 0) {
        stroke(this.color_yellow)
      } else if (pixel[0] > 0) {
        stroke(this.color_red)
      } else if(pixel[1] > 0) {
        stroke(this.color_green)
      } else {
        stroke(this.color_off)
      }
      point(posX + SCALING_FACTOR / 2, posY + SCALING_FACTOR / 2)
    }
  }
}

function setLine(text, red, green) {
  this.fillArea(0, 0, 25, 19, red, green)

  // U
  this.fillArea(5, 2, 7, 16, 0, 0)
  this.fillArea(10, 2, 12, 16, 0, 0)
  this.fillArea(5, 15, 12, 16, 0, 0)
  this.fillArea(6, 16, 11, 17, 0, 0)

  // 1
  this.fillArea(15, 2, 17, 15, 0, 0)
  this.fillArea(13, 15, 19, 17, 0, 0)
  this.setPixel(14, 3, 0, 0)
  this.setPixel(14, 4, 0, 0)
  this.setPixel(13, 4, 0, 0)
}

function addDivider(height, red, green) {
  for(let i = 0; i < PIXEL_WIDTH; i++) {
    setPixel(i, height - 1, red, green)
  }
}

function fillArea(x1, y1, x2, y2, red, green) {
  for(let i = x1; i < x2; i++) {
    for(let j = y1; j < y2; j++) {
      setPixel(i, j, red, green)
    }
  }
}

function getPixel(x, y) {
  let redValue = pixelData[x][y / INTS_PER_COLUMN] & (1 << (y % INTS_PER_COLUMN));
  let greenValue = pixelData[x][y / INTS_PER_COLUMN] & (1 << (y % INTS_PER_COLUMN) + 1)
  return [redValue, greenValue];
}

function setPixel(x, y, red, green) {
  pixelData[x][y / INTS_PER_COLUMN] = pixelData[x][y / INTS_PER_COLUMN] & (0 << (y % INTS_PER_COLUMN));
  pixelData[x][y / INTS_PER_COLUMN] = pixelData[x][y / INTS_PER_COLUMN] & (0 << (y % INTS_PER_COLUMN) + 1)
  pixelData[x][y / INTS_PER_COLUMN] = pixelData[x][y / INTS_PER_COLUMN] | (constrain(red, 0, 1) << (y % INTS_PER_COLUMN));
  pixelData[x][y / INTS_PER_COLUMN] = pixelData[x][y / INTS_PER_COLUMN] | (constrain(green, 0, 1) << (y % INTS_PER_COLUMN) + 1)
}

function dec2bin(dec) {
  let arr = new Array()
  for(let i = 0; i < 32; i++) {
    arr.push((dec & 1 << i) > 0 ? 1 : 0)
  }
  return arr
}
