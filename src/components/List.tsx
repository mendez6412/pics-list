import React, { Component } from 'react';
import { ListItem } from './ListItem';

type ListState = {
    pictures: IPictureMap;
    selected: string[];
}

interface IPictureMap {
    [id: string]: IPicture;
}

interface IPicture {
    id: string;
    url: string;
    title: string;
    isHidden: boolean;
    isSelected: boolean;
}

export interface IPictureItem extends IPicture {
    onItemClick: any;
}

interface IJsonResponse {
    kind: string;
    data: {
        children: IJsonPicture[];
    }
}

interface IJsonPicture {
    data: {
        gilded: number;
        title: string;
        score: number;
        over_18: boolean; // I'm assuming this is the NSFW flag, which I might want to use
        url: string;
        id: string;
    }
}

export class List extends Component<{}, ListState>  {
    fetchPictures() {
        fetch('https://www.reddit.com/r/pics.json')
        .then((response) => {
            return response.json();
        })
        .then((json: IJsonResponse) => {
            let pictureMap: IPictureMap = {};
            json.data.children.map(picture => {
                return pictureMap[picture.data.id] = {
                    id: picture.data.id,
                    url: picture.data.url,
                    title: picture.data.title,
                    isHidden: false,
                    isSelected: false
                };
            });
            return pictureMap;
        })
        .then((map) => {
            this.setState({
                pictures: map
            });
        })
        .catch((err) => {
            console.warn('error: ', err);
        })
    }

    componentDidMount() {
        this.fetchPictures();
    }

    onItemClick = (id: string) => {
        // TODO: Remove items when unselected
        const currentState = this.state && this.state.selected ? this.state.selected : [];
        const newPictures = {...this.state.pictures};
        newPictures[id].isSelected = !newPictures[id].isSelected;

        const index = currentState.indexOf(id);
        const isNotSelected = index === -1;

        if (isNotSelected) {
            currentState.push(id);
        } else {
            currentState.splice(index, 1);
        }
        this.setState({
            selected: currentState,
            pictures: newPictures
        });
    }

    hideSelected = () => {
        const newPictures = {...this.state.pictures};
        this.state.selected.forEach(id => {
            newPictures[id].isHidden = true;
        });

        this.setState({
            pictures: newPictures,
            selected: []
        });
    }

    render() {
        const pictures = this.state && this.state.pictures ? this.state.pictures : {};
        const selected = this.state && this.state.selected ? this.state.selected : [];
        return (
            <div>
                <div className="title">
                    <p className="selectedCount">{selected.length} pictures selected</p>
                    <button disabled={selected.length === 0} onClick={this.hideSelected}>Hide selected</button>
                </div>
                <div className="container">
                    {
                        Object.keys(pictures).map((key) => {
                            const picture = pictures[key];
                            return (
                                <ListItem key={key} id={picture.id} title={picture.title} url={picture.url} isHidden={picture.isHidden} isSelected={picture.isSelected} onItemClick={this.onItemClick}></ListItem>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}