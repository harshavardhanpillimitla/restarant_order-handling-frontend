import React, { Component } from 'react';


const endpoint = "http://localhost:8000/";


class Login extends Component {
    state = {

        username: '',
        password: ''
    }
    componentDidUpdate() {
        // const  token = this.props.user;
        const localtoken = localStorage.getItem('token');

        if(localtoken)
        {
            // this.props.history.replace('/home')

        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    onSubmit = async e => {

        e.preventDefault();


        let url = endpoint + 'auth/';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        })
        response.json().then(data => {
            console.log(data)
            localStorage.setItem("token", data.token);
            this.props.fetch_user(data.token)
            this.props.history.replace('/order')
        }
        )






    }


    render() {

        return (
            <div className="container ml-auto mr-auto mt-5">
                <div className="alert alert-info text-center ">Login</div>
                {this.props.last && <div className="form-group alert alert-info text-center">{this.props.last}</div>}
                <form onSubmit={this.onSubmit.bind(this)}>

                    <div className="form-group">
                        <label for="exampleInputEmail1">username </label>
                        <input type="text" className="form-control" id="username" aria-describedby="emailHelp" onChange={this.onChange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="password" onChange={this.onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>


        )
    }
}


export default Login;