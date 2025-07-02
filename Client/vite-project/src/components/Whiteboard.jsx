import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Rect, Circle } from "react-konva";

const Whiteboard = ({ tool, color, strokeWidth, lines, setLines }) => {
  const [currentShape, setCurrentShape] = useState(null);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    if (tool === "brush" || tool === "eraser") {
      const newLine = {
        tool,
        points: [pos.x, pos.y],
        stroke: color,
        strokeWidth: strokeWidth,
      };
      setLines([...lines, newLine]);
    } else if (tool === "rectangle") {
      setCurrentShape({
        type: "rect",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        stroke: color,
        strokeWidth: strokeWidth,
      });
    } else if (tool === "circle") {
      setCurrentShape({
        type: "circle",
        x: pos.x,
        y: pos.y,
        radius: 0,
        stroke: color,
        strokeWidth: strokeWidth,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || lines.length === 0) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === "brush" || tool === "eraser") {
      const lastLine = lines[lines.length - 1];
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };
      const updatedLines = [...lines.slice(0, -1), updatedLine];
      setLines(updatedLines);
    } else if (tool === "rectangle" && currentShape) {
      const newWidth = point.x - currentShape.x;
      const newHeight = point.y - currentShape.y;
      setCurrentShape({ ...currentShape, width: newWidth, height: newHeight });
    } else if (tool === "circle" && currentShape) {
      const radius = Math.sqrt(
        Math.pow(point.x - currentShape.x, 2) +
          Math.pow(point.y - currentShape.y, 2)
      );
      setCurrentShape({ ...currentShape, radius });
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (currentShape) {
      setLines([...lines, currentShape]);
      setCurrentShape(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className="
        flex-1
        p-4
        flex justify-center items-center
        bg-gray-50
        overflow-hidden
      ">
      <Stage
        width={containerSize.width ? containerSize.width * 0.95 : 0}
        height={containerSize.height ? containerSize.height * 0.95 : 0}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={stageRef}
        className="
          bg-gradient-to-br from-white to-gray-50
          border border-gray-200
          rounded-lg shadow-xl
        ">
        <Layer>
          {lines.map((shape, i) => {
            if (shape.tool === "brush" || shape.tool === "eraser") {
              return (
                <Line
                  key={i}
                  points={shape.points}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation={
                    shape.tool === "eraser" ? "destination-out" : "source-over"
                  }
                />
              );
            } else if (shape.type === "rect") {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  fill="transparent"
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
                  fill="transparent"
                />
              );
            }
            return null;
          })}
          {currentShape && currentShape.type === "rect" && (
            <Rect
              x={currentShape.x}
              y={currentShape.y}
              width={currentShape.width}
              height={currentShape.height}
              stroke={currentShape.stroke}
              strokeWidth={currentShape.strokeWidth}
              fill="transparent"
            />
          )}
          {currentShape && currentShape.type === "circle" && (
            <Circle
              x={currentShape.x}
              y={currentShape.y}
              radius={currentShape.radius}
              stroke={currentShape.stroke}
              strokeWidth={currentShape.strokeWidth}
              fill="transparent"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Whiteboard;
