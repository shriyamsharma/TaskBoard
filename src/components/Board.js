import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Stage, Layer } from "react-konva";
import Hexagon from './Hexagon';
import { addLine } from './Brush';

function Board() {

    const [hexagons, setHexagons] = useState([]);
    const [selectedId, selectShape] = useState(null);
    const [shapes, setShapes] = useState([]);
    const stageEl = React.createRef();
    const layerEl = React.createRef();

    const getRandomInt = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    const addHexagon = () => {
        console.log("clicked hexagon")
        const hex = {
            x: getRandomInt(250),
            y: getRandomInt(250),
            // x: 250,
            // y: 250,
            width: 100,
            height: 100,
            sides: 6,
            radius: 70,
            fill: "red",
            stroke: "black",
            strokeWidth: 4,
            id: `hex${hexagons.length + 1}`,
        };
        const hexas = hexagons.concat([hex]);
        setHexagons(hexas);
        const shs = shapes.concat([`hex${hexagons.length + 1}`]);
        setShapes(shs);
        };

    const drawLine = () => {
        addLine(stageEl.current.getStage(), layerEl.current);
    };

    return (
        <div>
            <h3>Task-Labellerr</h3>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight - 150}
                ref={stageEl}
                onMouseDown={e => {
                // deselect when clicked on empty area
                const clickedOnEmpty = e.target === e.target.getStage();
                if (clickedOnEmpty) {
                    selectShape(null);
                }
                }}
            >
                <Layer ref={layerEl}>
                    {hexagons.map((hex, i) => {
                        return (
                        <Hexagon
                            key={i}
                            shapeProps={hex}
                            isSelected={hex.id === selectedId}
                            onSelect={() => {
                            selectShape(hex.id);
                            }}
                            onChange={newAttrs => {
                            const hexas = hexagons.slice();
                            hexas[i] = newAttrs;
                            setHexagons(hexas);
                            }}
                        />
                        );
                    })}
                </Layer>
            </Stage>
            <ButtonGroup>
                <Button variant="dark" className="black" onClick={drawLine}>Line</Button>
                <Button variant="dark" className="black" onClick={addHexagon}>Hexagon</Button>
            </ButtonGroup>
        </div>
    )
}

export default Board
