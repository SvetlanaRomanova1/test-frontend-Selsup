import React from 'react';
import ParamEditor from "../src/components/param-editor/ParamEditor";


const model = {
    "paramValues": [
        {
            "paramId": 1,
            "value": "повседневное"
        },
        {
            "paramId": 2,
            "value": "макси"
        }
    ]
}

const params = [
    {
        "id": 1,
        "name": "Назначение"
    },
    {
        "id": 2,
        "name": "Длина"
    }
]

export default function App() {
    return (
        <ParamEditor model={model} params={params}/>
    )
}
