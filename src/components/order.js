import React, { Component } from 'react';


class Order extends Component {
    accept = (e) => {
        this.props.accepted_order(parseInt(e.target.id))
    }
    cancel_assigned_delivery = e=>{
        this.props.declined_order(parseInt(e.target.id))
    }
    delivered = e => {
        this.props.delivered_order(parseInt(e.target.id))
    }
    clear_unassigned = e => {
        this.props.clear_unassigned_order(parseInt(e.target.id))
    }
    render() {
        let order = this.props.order_item;
        if(order.status!=='DL'){
            
        }
        return order.status==='OD' || order.status==='UD'?<div></div>:<div className="card m-4" style={{ "width": "25rem" }}>
            <div className="card-body">
                <h5 className="card-title">random username</h5>
                <p className="card-text">address:
                
                .</p>
                {order.status === 'OP' ?
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" id={order.order_id} className="m-2 btn btn-warning" onClick={this.clear_unassigned}>reject</button>
                        <button type="button" id={order.order_id} className="m-2 btn btn-success" onClick={this.accept} >accept</button>
                    </div> : <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" id={order.order_id} className="m-2 btn btn-danger " onClick={this.cancel_assigned_delivery} >cancel delivery</button>
                        <button type="button" id={order.order_id} className="m-2 btn btn-warning" >delivering..</button>
                        <button type="button" id={order.order_id} className="m-2 btn btn-success" onClick={this.delivered}>delivered</button>
                    </div>}
            </div>
        </div>
    }

}
export default Order;