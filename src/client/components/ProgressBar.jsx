import React from 'react';

export const ProgressBar = ({project}) => {

    const colors = {
        "Todo": "#E6511F",
        "In progress": "#F5CD33",
        "In review": "#96E641",
        "Completed": "#8CAFB4"
    }

    const calculateBar = () => {
        let itemCount = 0
        project.kanban.forEach(column => {
            column.items.forEach(() => {
                itemCount++
            })
        })
        return itemCount
    }

    const styling = column => {
        const itemCount = calculateBar()
        const width = itemCount ? ( column.items.length / itemCount ) * 100 : 0
        return {
            height: "25px",
            width: `${Math.ceil(width)}%`,
            backgroundColor: `${colors[column.title]}`
        }
    }

    return (
        <div className="progress-bar">
            {project && project.kanban.map(column => {
                return (
                    <div key={column.id} className="progress-item" style={styling(column)}></div>
                )
            })}
            
        </div>
    )
}