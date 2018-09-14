// Screen dimensions
const WIDTH = 740
const HEIGHT = 480
const SQUARES = 10000

// Create the screen canvas and context
var screen = document.createElement('canvas');
var screenCtx = screen.getContext('2d');
screen.height = HEIGHT;
screen.width = WIDTH;
document.body.appendChild(screen);

// Create the back buffer and context
var backBuffer = document.createElement('canvas');
var backBufferCtx = screen.getContext('2d');
backBuffer.height = HEIGHT;
backBuffer.width = WIDTH;

// Get random positions
var cryptObj = window.crypto || window.msCrypto; // for IE 11
var positions = new Int16Array(SQUARES);
cryptObj.getRandomValues(positions);

function render(ctx) {
  // clear the canvas
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  // render the squares
  for(var i = 0; i < SQUARES - 1; i++) {
    ctx.fillStyle = '#' + positions[i].toString(16);
    ctx.fillRect(positions[i] % WIDTH, positions[i+1] % HEIGHT, 10, 10);
    ctx.fillRect(positions[i+1] % WIDTH, positions[i] % HEIGHT, 10, 10);

  }
  ctx.fillStyle = "red";
  ctx.fillRect(400, 400, 50, 50);
}

function loop() {
  // render into back buffer
  render(backBufferCtx);
  // flip buffers
  screenCtx.drawImage(backBuffer, 0, 0);
  setTimeout(loop, 3);
}

loop();
