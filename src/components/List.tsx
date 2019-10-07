import React, { Component } from 'react';

type ListState = {
    pictures: [];
    counter: number;
}

interface IPicture {
    url: string;
}

export class List extends Component<{}, ListState>  {
    fetchPictures() {
        fetch('https://www.reddit.com/r/pics.json')
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log('json: ', json);
        })
        .catch((err) => {
            console.warn('error: ', err);
        })
    }

    tick() {
        const newValue = this.state ? this.state.counter + 1 : 1;
        this.setState({
            counter: newValue
        });
    }

    componentWillMount() {
        this.tick();
    }

    componentDidMount() {
        this.fetchPictures();
        setInterval(() => this.tick(), 1000);
    }

    render() {
        return <p>Time keeps on tickin: {this.state.counter}</p>;
    }
}