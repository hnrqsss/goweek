import React, { Component } from 'react';
import './Login.css'
import twitterLogo from '../twitter.svg'

// import { Container } from './styles';

export default class Login extends Component {
    
    state = {
        username : ''
    }

    handleInputChange = element => {
        this.setState({username: element.target.value})
    }

    handleSubmit = form => {
        form.preventDefault()

        const { username } = this.state

        if(!username.length) return

        localStorage.setItem('@GoTwitter:username', username)
        
        this.props.history.push('/timeline')
    }
  
    render() {
    return (
        <div className='login-wrapper'>
            <img src={twitterLogo} alt='Go Twitter' />
            <form onSubmit={this.handleSubmit}>
                <input 
                    placeholder='Nome de usuário'
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    />
                <button type='submit'>Entrar</button>    
            </form>
        </div>
    );
  }
}
