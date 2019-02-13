import React, { Component } from 'react';
import axios from 'axios';

export default class Stories extends Component {
    state = {
        stories: [],
        relatedStories: null,
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
            debugger
        }
        
    }

    render() {
        let { stories, loading } = this.state;
        let { stock, company } = this.props;
        
        if (stock && loading) {
            axios.get(`api/data/relatednews/${stock}`)
            .then(res => {
                this.setState({ relatedStories: res.data, loading: false })
                // debugger
            }).catch(err => {
                debugger
            })
        }
        // const relatedStoriesExist = this.state.relatedStories;
        return (
            <div>
            {company ? 
            (
                <div>
                    <h1>Related News</h1>
                    <div className="row">
                    { this.state.relatedStories.map((story, i) => {
                        return <div className="card col-sm-12 col-md-4" key={i}>
                            <div className="card-body text-center">
                                <h4 className="card-subtitle">{story.datetime}</h4>
                                <h4 className="card-title">{story.headline}</h4>
                                <a href={story.url}>{story.url}</a>
                                <p>Sources: {story.source}</p>
                                <p>Related: {story.related}</p>
                            </div>
                        </div>
                    })}
                    </div>
                </div>
            )
            :(
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
                    })}
                    </div>
                </div>
            )}
            </div>
        )
    }
}