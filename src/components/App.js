import React, { Component } from 'react';
import './App.scss';

class App extends Component {
    state = {
        value: '',
        data: [],
        search: false
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            search: true
        })
        const keyword = this.state.value;
        fetch('https://www.googleapis.com/books/v1/volumes?q='+keyword+'&key=AIzaSyBxXUFU_2uFnGagaPjFXg2jYj0ULlXckOk', {
        method: 'get'
        })
        .then(res => res.json())
        .then(data => this.setState({data: data.items}))
    }

    handleChange = e =>
        this.setState({
            value: e.target.value
        })
    
    render() {
        const bookList = this.state.data.map(d => <div key={d.etag} className="book">
            <img src={d.volumeInfo.imageLinks.smallThumbnail} className="col-xs-12 img img-fluid"/>
            <span className="info">{d.volumeInfo.title}<br></br>by {d.volumeInfo.authors}<br></br>{d.volumeInfo.publishedDate}</span>
        </div>)
        return (
            <div className="container">
                <div id="search" style={{ 'top': this.state.search ? '0' : '50vh' }} className="search">
                    <form id="myForm" onSubmit={this.handleSubmit}>
                        <input type="text" id="input" placeholder="&#x1F50E;" onChange={this.handleChange} name="input" value={this.state.value}/>
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
                <div id="books">{bookList}</div>
            </div>
        );
    }
}

export default App;