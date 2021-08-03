import React, { Component } from 'react';
import Order from './order';


class Home extends Component{
    render(){
        return this.props.blocked===true?<h1>please contact admin to unblock</h1>:<div>
            {this.props.act_orders.map(order_item => {
                return <Order order_item={order_item} accepted_order={this.props.accepted_order}  declined_order={this.props.declined_order} delivered_order={this.props.delivered_order} notdeclivered_order={this.props.notdeclivered_order} clear_unassigned_order={this.props.clear_unassigned_order}/>
            }) }
            
        </div>
    }

}
export default Home;