import React, { Component } from 'react';
import axios from 'axios';

export default class Stories extends Component {
    state = {
        stories: [],
        loading: true
    }

    async componentDidMount() {
        // after signing up and redirecting to profile, first time load errors out
        // says the api call to populate news does not have the token...
        try{
            let res = await axios.get(`api/data/allnews`)
            // debugger
            this.setState({ stories: res.data })
        } catch(err) {
            console.log(err);
        }
        
    }

    render() {
        let { stories } = this.state;
        // stories.datetime, headline, source, url, image, related

        return (
            <div>
                <h1>Top News</h1>
                <div className="row">
                { stories.map((story, i) => {
                    return <div className="card col-sm-12 col-md-4" key={i}>
                        <div className="card-body text-center">
                            <h4 className="card-subtitle">{story.datetime}</h4>
                            <h4 className="card-title">{story.headline}</h4>
                            <a href={story.url}>{story.url}</a>
                            <p>Sources: {story.source}</p>
                            <p>Related: {story.related}</p>
                        </div>
                    </div>
                    })
                }
                </div>
            </div>
        )
    }
}