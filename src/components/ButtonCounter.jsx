import React, { Component } from 'react';
import Button from './Button';

class ButtonCounter extends Component {
    state = {
        counter: 0
    };

    componentDidMount() {
        this.setState((prevState) => ({
            counter: prevState.counter // this.state.counter
        }));
    }

    increaseCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    };

    decreaseCounter = () => {
        const counterNotBelowZero = (state) => {
            return state.counter > 0 ? state.counter - 1 : state.counter;
        };

        this.setState((prevState) => ({
            counter: counterNotBelowZero(prevState)
        }));
    };

    resetCounter = () => {
        this.setState({
            counter: 0
        });
    };

    render() {
        // destructure state
        const { counter } = this.state;

        return (
            <>
                <h2>Button Counter App: React Way</h2>

                <Button
                    buttonType="button"
                    bgColor="red"
                    name="- DECREMENT"
                    handleClick={this.decreaseCounter}
                />

                <Button
                    buttonType="button"
                    bgColor="yellow"
                    color="black"
                    name={counter}
                    handleClick={this.resetCounter}
                />

                <Button buttonType="button" name="INCREMENT +" handleClick={this.increaseCounter} />

                {/* <button type="button" onClick={this.decreaseCounter}>
                    - DECREMENT
                </button>
                <button type="button" onClick={this.resetCounter}>
                    {counter}
                </button>
                <button type="button" onClick={this.increaseCounter}>
                    INCREMENT +
                </button> */}
            </>
        );
    }
}

export default ButtonCounter;
