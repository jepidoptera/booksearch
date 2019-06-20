import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Search extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        this.loadBooks();
    }

    // Add code here to get all books from the database and save them to this.state.books
    loadBooks() {
        console.log("searching books...");
        API.searchBook()
            .then(res => {
                // console.log("books:", books);
                console.log("got something");
                console.log("it is this: ", res.data);
                this.setState({ books: res.data });
            })
    };

    render() {
        return (
            this.state.books.map(book => 
                (<div><p>{book.volumeInfo.title}</p>
                    <img src="{book.volumeInfo.imageLink.thumbnail}"></img>
                </div>)
                )
            )
        }
    }
    
export default Search;