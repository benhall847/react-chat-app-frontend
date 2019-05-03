import React from 'react';
import './App.css';
import ChatList from './ChatList'
import axios from 'axios'
import ChatForm from './ChatForm'
import qs from 'qs'


class App extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        messages: [],
        newMessage:''
      };
    };

componentDidMount(){
    setInterval(async()=>{
      let {data} = await axios.get('/api')
      this.setState({
        messages:data
      })
    }, 2000);
  }
  _postMessage = async()=>{
    console.log(this.state.newMessage)
    await axios({
      method:'post',
      url:'/api',
      data: qs.stringify({

        message:this.state.newMessage
      }),
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      }
    })
    this.setState({
      newMessage: ''
    })
  }
  _changeHandler = (newMessage)=>{
    this.setState({
      newMessage
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <ChatList
            messages={this.state.messages}
          />

          <ChatForm
            clickHandler={this._postMessage}
            newMessage={this.state.newMessage}
            changeHandler={this._changeHandler}
          
          />

        </header>
      </div>
    );
  }
}

export default App;
