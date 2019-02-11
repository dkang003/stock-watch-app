import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default class Graph extends Component {
    render() {
        let { currentUser } = this.props;
        
        return(
            <div>
                <h1>Graph goes Here</h1>
                <LineChart
                    width={400}
                    height={400}
                    // data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
                    <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
                </LineChart>
            </div>
        )
    }
}