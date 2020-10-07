import React, { useState } from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MovableItem = ({name, setItems}) => {

    const changeItemColumn = (currentItem, columnName) => {
        setItems((prevState) => {
            return prevState.map(e => {
                return {
                    ...e,
                    column: e.name === currentItem.name ? columnName : e.column,
                }
            })
        });
    }

    const [{isDragging}, drag] = useDrag({
        item: {name, type: 'Our first type'},
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult && dropResult.name === 'Column 1') {
                changeItemColumn(item, 'Column 1')
            } else {
                changeItemColumn(item, 'Column 2')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{opacity}}>
            {name}
        </div>
    )
}

const Column = ({children, className, title}) => {
    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    });

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

export const App = () => {
    const [items, setItems] = useState([
        {id: 1, name: 'Item 1', column: 'Column 1'},
        {id: 2, name: 'Item 2', column: 'Column 1'},
        {id: 3, name: 'Item 3', column: 'Column 1'},
    ]);

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item) => (
                <MovableItem key={item.id} name={item.name} setItems={setItems}/>
            ))
    }

    return (
        <div className="container">
            <DndProvider backend={HTML5Backend}>
                <Column title='Column 1' className='column first-column'>
                    {returnItemsForColumn('Column 1')}
                </Column>
                <Column title='Column 2' className='column second-column'>
                    {returnItemsForColumn('Column 2')}
                </Column>
            </DndProvider>
        </div>
    );
}
