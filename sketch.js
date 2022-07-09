var sprite;
var position;
var database;

function setup() {
  database = firebase.database()
  createCanvas(500, 500);
  sprite = createSprite(250, 250)
  sprite.shapeColor = "blue";
  var positionRef = database.ref("ball/position");
  positionRef.on("value", readPosition, showError);

}

function draw() {
  background(0);

  if (keyDown(LEFT_ARROW)) {
    changePosition(-2, 0)
  }
  if (keyDown(RIGHT_ARROW)) {
    changePosition(2, 0)
  }
  if (keyDown(UP_ARROW)) {
    changePosition(0, -2)
  }
  if (keyDown(DOWN_ARROW)) {
    changePosition(0, 2)
  }

  drawSprites();
}

function changePosition(x, y) {
  database.ref("ball/position").set({
    "x": position.x + x,
    "y": position.y + y
  });

}

function readPosition(data) {
  position = data.val();
  sprite.x = position.x;
  sprite.y = position.y;

}

function showError() {
  console.log("Error in the database");
}