import Konva from "konva";

export const addLine = (stage, layer, mode = "brush") => {
  let isPaint = false;
  let lastLine;
  stage.on("mousedown touchstart", function(e) {
    isPaint = true;
    let pos = stage.getPointerPosition();
    lastLine = new Konva.Line({
      stroke: mode == "brush" ? "black" : "white",
      strokeWidth: mode == "brush" ? 5 : 20,
      globalCompositeOperation:
        mode === "brush" ? "source-over" : "destination-out",
      points: [pos.x, pos.y],
      draggable: mode == "brush",
    });
    // console.log(lastLine)
    layer.add(lastLine);
  });
  stage.on("mouseup touchend", function() {
    isPaint = false;
  });
  stage.on("mousemove touchmove", function() {
    if (!isPaint) {
      return;
    }
  const pos = stage.getPointerPosition();
    let newPoints = lastLine.points().concat([pos.x, pos.y]);
    console.log(newPoints)
    lastLine.points(newPoints);
    layer.batchDraw();
  });
};