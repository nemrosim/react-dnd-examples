import React from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MovableItem = () => {
    const [{isDragging}, drag] = useDrag({
        item: {name: 'Any custom name', type: 'Our first type'},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{opacity}}>
            We will move this item
        </div>
    )
}

const Column = ({children, className, title}) => {
    const [{canDrop, isOver}, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: 'Some name'}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    console.log('options', {canDrop, isOver});

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

export const App = () => {
    return (
        <div className="container">
            {/* Wrap components that will be "draggable" and "droppable" */}
            <DndProvider backend={HTML5Backend}>
                <Column title='Column 1' className='column first-column'>
                    {<MovableItem/>}
                </Column>
                <Column title='Column 1' className='column second-column'>
                    {null}
                </Column>
            </DndProvider>
        </div>
    );
}
