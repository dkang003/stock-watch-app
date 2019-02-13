import React, { Component } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Label, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default class HomeGraph extends Component {
    state = {
        data:null
    }
    // Ping API for most active stocks in market 
    async componentDidMount() {
        let res = await axios.get('api/data/mostactive')
        this.setState({ data: res.data })
        debugger
    }
    
    render() {
        let {data} = this.state;
        // debugger
        return(
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="companyName" />
                <YAxis doman={['auto', 'auto']} />
                <Tooltip />
                <Legend />
                <Bar dataKey="high" fill="#8884d8" />
                <Bar dataKey="low" fill="#82ca9d" />
            </BarChart>
        )
    }
}