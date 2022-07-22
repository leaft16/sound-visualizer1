var mic
var fft
let rotation

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight, WEBGL)
  angleMode(DEGREES)
  mic = new p5.AudioIn()
  mic.start()
  fft = new p5.FFT()
  fft.setInput(mic)
  rotation = 90
}

function draw() {
  background(0)
  stroke('#FF1818')
  strokeWeight(3)
  noFill()

  var wave = fft.waveform()

  smooth()
  beginShape()
  for (var i = 0; i <= 180; i+=0.5) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 400)

    var x = r * sin(i)
    var y = r * cos(i)
    vertex(x,y)
  }
  endShape()

  smooth()
  beginShape()
  for (var i = 0; i <= 180; i+=0.5) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))

    var r = map(wave[index], -1, 1, 150, 400)

    var x = r * -sin(i)
    var y = r * cos(i)
    vertex(x,y)
  }
  endShape()

  smooth()
  rotateX(-rotation)
  rotateY(rotation)
  rotateZ(rotation)

  strokeWeight(2)
  fill(255, 24, 24, 160)
  box(140)
  
  rotation += .2

  if (rotation >= 360)
    rotation = 0
}
