import React, { Component } from 'react';
import socket from 'socket.io-client'

import './Timeline.css'
import twitterLogo from '../twitter.svg'
import api from '../services/api'
import Tweet from './Tweet';

export default class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ''
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000')
        
        io.on('tweet', data => {
            this.setState({tweets: [data, ...this.state.tweets]})
        })

        io.on('like', data => {this.setState({tweets: this.state.tweets.map(tweet => 
            tweet._id === data._id ? data : tweet
        )})})
    }

    async componentDidMount() {

        this.subscribeToEvents()

        const response = await api.get('tweets')

        this.setState({ tweets: response.data })
    }

    handleSubmit = async form => {        
        if(form.keyCode !== 13) return
            
        const content = this.state.newTweet
        const author = localStorage.getItem('@GoTwitter:username')

        await api.post('tweets', { content, author })
        
        this.setState({ newTweet: ''})
    }

    handleInput = element => {
          this.setState({ newTweet: element.target.value })  
    }
  
    render() {
        return (
            <div className='timeline-wrapper'>
                <img src={twitterLogo} height={24} alt='Go Twitter' /> 

                <form onKeyDown={this.handleSubmit}>
                    <textarea 
                        value={this.state.newTweet}
                        onChange={this.handleInput}
                        ></textarea>
                </form>
                <ul className='tweet-list'>
                    { this.state.tweets.map(tweet => <Tweet key={tweet._id} tweet={tweet}/>)}
                </ul>    
            </div>
        )
  }
}
