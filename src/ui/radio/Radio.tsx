import React, {Component} from 'react';

import './Radio.less';
import {Option} from "./RadioType";


interface RadioProps {
    options?: Option[];
    value?: string | any
    defaultValue?: string | any;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

class Radio extends Component<RadioProps> {

    valueControl: boolean = true;
    timestamp: string = 'radio_' + Math.random().toString(36).substr(2, 9);

    state = {
        value: ''
    }

    constructor(props: RadioProps) {
        super(props);
        this.valueControl = props.value !== undefined;
        this.state = {
            value: props.value || props.defaultValue || ''
        }
    }

    onChange = (event: any) => {
        const {onChange} = this.props;
        onChange && onChange(event.target.value);
        if (!this.valueControl) {
            this.setState({
                value: event.target.value
            });
        }
    }

    generateOptions = () => {
        const {options = [], disabled = false} = this.props;
        return options.map((option: Option, index: number) => {
            const value = this.valueControl ? this.props.value : this.state.value;
            let checked = false;
            if (option.value === value)
                checked = true;
            return (
                <label className="radio-button" key={index + ''}
                       style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}>
                    <input checked={checked} disabled={disabled} onChange={this.onChange} value={option.value}
                           name={this.timestamp}
                           type="radio"/>
                    <div className="radio-circle"/>
                    <span className="radio-label">{option.label}</span>
                </label>
            );
        });
    }

    render() {
        return (
            <div className="radio-buttons">
                {this.generateOptions()}
            </div>
        );
    }
}

export default Radio;