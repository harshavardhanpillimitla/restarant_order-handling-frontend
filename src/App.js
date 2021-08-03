import React, { Component } from "react";
import DNavBar from "./components/navbar";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";

const endpoint = "http://localhost:8000/";

class App extends Component {
  state = {
    chat_socket: '',
    token: '',
    username: '',
    user_id: 0,
    active_orders: [],
    blocked:false
  }

  fetch_user = async (token) => {
    let url = endpoint + 'getuser/';
    const dat = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    console.log(dat)
    const response = await fetch(url, {
      method: 'GET',
      headers: dat

    })
    response.json().then(data => {
      console.log(data)
      this.setState({ ...this.state, username: data.username, user_id: data.id, token: token  ,blocked:data.blocked})

    }
    )


  }
  update_state_orders = (current_order, typeof_order) => {
    let active_orders = this.state.active_orders
    active_orders.push(current_order)

    console.log(active_orders)
    this.setState({ ...this.state, active_orders: active_orders })

  }
  modified_orders = (current_order, typeof_order) => {
    let active_orders = this.state.active_orders.filter(order => order.order_id !== current_order.order_id)
    active_orders.push(current_order)

    console.log(active_orders)
    this.setState({ ...this.state, active_orders: active_orders })


  }

  new_chat_socket = () => {
    let update_state = this.update_state_orders
    let modified_orders = this.modified_orders
    // ?creating socket 
    var loc = window.location
    var wsStart = "ws://"
    if (loc.protocol === "https:") {
      wsStart = "wss://"
    }
    const chatSocket = new WebSocket(
      'ws://'
      + '127.0.0.1:8000'
      + '/ws/chat/'
      + 'room_name'
      + '/'
    );

    
    // chatSocket.send(JSON.stringify({'type':'accepted_delivery'}))
    this.setState({ ...this.state, chat_socket: chatSocket })
    // ?listening
    chatSocket.onmessage = function (e) {
      console.log('hi')
      // parsing data received
      const current_message = JSON.parse(e.data);
      // abc()
      console.log(current_message)
      // {
      //   "status_type": "order placed",
      //   "status": "OD",
      //   "delevered_by": null
      // }
      if (current_message.status_type === 'order placed') {
        update_state(current_message, current_message.status_type)

      }
      else {
        modified_orders(current_message, current_message.status_type)
      }


    }
    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly', e);
    };


  }
  componentDidMount() {
    this.new_chat_socket()

  }

  // order accepted 
  accepted_order = (order_id) => {
    alert('k')
    let user_id = this.state.user_id;
    console.log(user_id)

    this.state.chat_socket.send(JSON.stringify({
      'type': 'order accepted',
      'order_id': order_id,
      'user_id': user_id
    }))
  }

  declined_order = (order_id) => {
    let user_id = this.state.user_id;
    this.state.chat_socket.send(JSON.stringify({
      'type': 'order declined',
      'order_id': order_id,
      'user_id': user_id
    }))
  }

  delivered_order = (order_id) => {
    let user_id = this.state.user_id;
    this.state.chat_socket.send(JSON.stringify({
      'type': 'order delivered',
      'order_id': order_id,
      'user_id': user_id
    }))
  }

  notdeclivered_order = (order_id) => {
    let user_id = this.state.user_id;
    this.state.chat_socket.send(JSON.stringify({
      'type': 'order not declivered',
      'order_id': order_id,
      'user_id': user_id
    }))
  }

  clear_unassigned_order=(order_id)=>{
    let filter_orders = this.state.active_orders.filter(order => order.order_id !== order_id)
    this.setState({...this.state, active_orders:filter_orders})
  }
  render() {


    return <div>
      <DNavBar />
      <div>
        <Switch>
          {/* <Route path="/playlist/:id" component={Songlist} />

            <Route path="/register" component={Register} />
            <Route path="/bill" component={Bill} />

            <Route path="/medicines" component={MedicineList} />
            <Route path="/createplaylist" component={addPlaylist} />
            <Route path="/addsong" component={AddSong} /> */}
          <Route path="/order" render={(props) => <Home {...props} act_orders={this.state.active_orders} accepted_order={this.accepted_order} declined_order={this.declined_order} delivered_order={this.delivered_order} notdeclivered_order={this.notdeclivered_order} blocked={this.state.blocked} />} />
          <Route path="/" exact render={(props) => <Login {...props} fetch_user={this.fetch_user} />} />
        </Switch>
      </div>
    </div>
  }

}
export default App;