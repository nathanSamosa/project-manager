import React, { useEffect } from 'react';



export const Chart = ({ project }) => {
    const canvasSize = 200;
    

    function draw(itemCount) {
        var canvas = document.getElementById(`canvas-${project.id}`);
        var ctx = canvas.getContext("2d");

        const totalCount = Object.values(itemCount).reduce((a, b) => a + b, 0)
        
        // Colors
        var colors = [
            'rgb(140, 175, 180)',
            'rgb(150, 230, 65)',
            'rgb(245, 205, 51)',
            'rgb(230, 81, 31)'
        ];
        
        // List of Angles
        var angles = [
            Math.PI * 2 * itemCount.low/totalCount,
            Math.PI * 2 * itemCount.normal/totalCount,
            Math.PI * 2 * itemCount.high/totalCount,
            Math.PI * 2 * itemCount.urgent/totalCount,
        ];
        
        // Temporary variables, to store each arc angles
        var beginAngle = 0;
        var endAngle = 0;

        ctx.moveTo(canvasSize/2, canvasSize/2);
        ctx.beginPath();
        ctx.arc(canvasSize/2, canvasSize/2, canvasSize*0.49, 0, 2*3.1415);
        ctx.stroke();
        
        // Iterate through the angles
        for(var i = 0; i < angles.length; i = i + 1) {
            // Begin where we left off
            beginAngle = endAngle;
            // End Angle
            endAngle = endAngle + angles[i];
            
            ctx.beginPath();
            // Fill color
            ctx.fillStyle = colors[i % colors.length];
            
            // Same code as before
            ctx.moveTo(canvasSize/2, canvasSize/2);
            ctx.arc(canvasSize/2, canvasSize/2, canvasSize*0.49, beginAngle, endAngle);
            ctx.lineTo(canvasSize/2, canvasSize/2);
            ctx.stroke();
            
            // Fill
            ctx.fill();
        }
    }

    const calculatePie = () => {
        const itemCount = {
            low: 0,
            normal: 0,
            high: 0,
            urgent: 0
        };
        project.kanban.forEach(column => {
            column.items.forEach(item => {
                itemCount[item.priority]++
            })
        })
        return itemCount
    }
    
    useEffect(() => {
        const itemCount = calculatePie()
        draw(itemCount)
    }, [])

    return (
        <canvas id={`canvas-${project.id}`} width="210" height="210"></canvas>
    )
}