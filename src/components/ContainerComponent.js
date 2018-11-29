import React, { Component } from 'react';
import DisplayComponent from './DisplayComponent';
import { loginWithGmail } from '../services/firebase';
class ContainerComponent extends Component {

    state = {
        logged: false,
        users:[
            {
                name:'Ricardo 1',
                age: 28
            },{
                name:'Ricardo 2',
                age: 28
            }
        ]
    }
    login = ()=>{
        loginWithGmail().then( user => {
            console.log(user);
            this.setState({
                logged: true
            });
        });

    }
    render() {
        const {users,logged} = this.state;
        if(!logged){
            return(
                <div>
                    <button onClick={this.login}>Inciar con google</button>
                </div>
            )
        }
        return (
            <div>
                {users.map((user,i)=>(
                    <DisplayComponent key={i} {...user} />
                ))}
            </div>
        );
    }
}

export default ContainerComponent;