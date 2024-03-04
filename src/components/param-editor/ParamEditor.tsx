import React from 'react';
import "./ParamEditor.css";


interface Param {
    id: number;
    name: string;
    type?: 'string' | 'number' | 'list';
    options?: string[];
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    model: Model;
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: this.props.model,
        };
    }

    updateParamValue = (paramId: number, value: string) => {
        const updatedParamValues = this.state.model.paramValues.map(paramValue => {
            if (paramValue.paramId === paramId) {
                return { ...paramValue, value };
            }
            return paramValue;
        });
        this.setState({ model: { ...this.state.model, paramValues: updatedParamValues } });
    };

    getModel = (): Model => {
        return this.state.model;
    };


    renderInput = (param: Param) => {
        const value = this.state.model.paramValues.find(pv => pv.paramId === param.id)?.value || '';

        switch (param.type) {
            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => this.updateParamValue(param.id, e.target.value)}
                    />
                );

            case 'list':
                return (
                    <select
                        value={value}
                        onChange={(e) => this.updateParamValue(param.id, e.target.value)}
                    >
                        {param.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'string':
            default:
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => this.updateParamValue(param.id, e.target.value)}
                    />
                );
        }
    };

    render() {
        const { params } = this.props;

        return (
            <div>
                {params.map((param) => (
                    <div key={param.id}>
                        <label className='label'>
                            {param.name}
                            {this.renderInput(param)}
                        </label>
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;
