import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default class Graph extends Component {
    // this.props.stock // is a sybol of the stock
    state={
        data: null,
        loading: true,
        symbol: null
    }

    render() {
        let { stock } = this.props;
        // debugger
        if (this.state.loading || stock !== this.state.symbol) {
            // debugger
            axios.get(`/api/data/company/${stock}/chart`)
            .then(res => {
                this.setState({ data: res.data, loading: false, symbol: stock })
                // debugger
            }).catch(err => {
                debugger
            })
        }
        
        return(
            <div>
                { (this.state.loading) 
                ? (<h1>See a chart here</h1>)
                :
                (<h1>{stock}</h1>)
                }
                
                <LineChart width={730} height={400} data={this.state.data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto','auto']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="high" stroke="#8884d8" />
                    <Line type="monotone" dataKey="low" stroke="#82ca9d" />
                </LineChart>
            </div>   
        )
    }
}