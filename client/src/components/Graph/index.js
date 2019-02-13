import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import HomeGraph from '../HomeGraph';

export default class Graph extends Component {
    // this.props.stock // is a sybol of the stock
    state={
        data: null,
        loading: true,
        symbol: null,
        logo: null
    }

    render() {
        let { stock, company } = this.props;
        let { logo } = this.state;
        if ((stock && this.state.loading) || stock !== this.state.symbol) {
            axios.get(`/api/data/company/${stock}/chart`)
            .then(res => {
                this.setState({ data: res.data, loading: false, symbol: stock })
                axios.get(`/api/data/getlogo/${stock}`)
                .then(res => {
                    this.setState({ logo: res.data.url })
                    // debugger
                }).catch(err => {
                    debugger
                })
            }).catch(err => {
                debugger
            })

        }
        // debugger
        return(
            <div>
                { (this.state.loading) 
                ? (<div>
                    <h1>Most Active Stocks</h1>
                    <HomeGraph />
                </div>)
                :
                (<div>
                    <img src={logo}></img>
                    <h1>{company.companyName}</h1>
                    <p><strong>CEO:</strong> {company.CEO}<br/>
                    <strong>Description:</strong> {company.description}<br/>
                    <strong>Exchange:</strong> {company.exchange}<br/>
                    <strong>Website:</strong> {company.website}<br/>
                    </p>
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
                )}
            </div>   
        )
    }
}