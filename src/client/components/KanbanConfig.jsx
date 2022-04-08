import React from 'react'



import '../styles/kanban-config.css'

import { KanbanForm } from './KanbanForm'
import { ItemDetails } from './ItemDetails'

export const KanbanConfig = ({kanban, setFetchKanban, setItemConfig, selectedItem, setSelectedItem}) => {


    return (
        <div className="kanban-config">
            <KanbanForm kanban={kanban} setFetchKanban={setFetchKanban}/>
            <div className="item-config">
                <label>
                    Show priority:
                    <input name="priority" type="checkbox" onChange={setItemConfig}/>
                </label>
                <label>
                    Enable delete:
                    <input name="delete" type="checkbox" onChange={setItemConfig}/>
                </label>
            </div>
            <ItemDetails selectedItem={selectedItem} setSelectedItem={setSelectedItem} setFetchKanban={setFetchKanban}/>
        </div>
    )
}