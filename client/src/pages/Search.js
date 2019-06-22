import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import "../css/pages.css"
import BookCard from "../components/BookCard"
import Nav from "../components/Nav";
import MessageBar from "../components/MessageBar";

class Search extends Component {
    state = {
        books: [],
        message: ""
    };

    componentDidMount() {
        // roll the 26-sided dice
        this.findBook(
            'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)],
            'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]
        )
    }

    // Add code here to get all books from the database and save them to this.state.books
    findBook(title, author) {
        // if no title provided, search a random letter
        if (!title && !author) {
            title = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
            author = 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
        }
        console.log(`searching books with title: ${title} author: ${author}`);
        API.searchBook(title, author)
            .then(res => {
                // console.log("books:", books);
                console.log("found these: ", res.data);
                this.setState({ books: res.data });
            })
    };

    formSubmit(self, event) {
        event.preventDefault();
        self.findBook(event.target.title.value, event.target.author.value);
    }

    saveBook(self, book) {
        console.log(`clicked save (${book.title})`);
        // message("book saved.");
        API.saveBook(book).then(data => {
            console.log("deleting", data);
            document.getElementById(data.data.title).remove();
        });
        self.setState({ message: `"${book.title}" saved to archive.` });
        setTimeout(() => {
            self.setState({ message: "" });
        }, 1000);
    }

    render() {
        return (
            <div className="container-flex">
            <div className="row">
            {/* search params */}
            <div className="col-12">
                <MessageBar message={this.state.message} />
                <Nav selected="search"/>
                <form id="searchForm" 
                    onSubmit={(event) => this.formSubmit(this, event)}>
                    
                    Title: <input name='title'></input><br></br>
                    <br></br>
                    Author: <input name='author'></input><br></br>
                    <br></br>
                    <button type="submit">try your luck</button>
                </form>
                <hr></hr>
                Click title to see book synopsis.  Click image to view book content.
                <br></br>
            </div>
            </div>
            
            <div className="row">
                {/* books results */}
                {this.state.books.map((book, i) => { return (
                    <div className="col-xs-12 col-md-6 col-lg-4" key={i} id={book.title}>
                        <BookCard {...book} button={{ text: "save", function: (book) => { this.saveBook(this, book) } }} key={i}></BookCard>
                    </div>
                )
                })}
            </div>
            
            </div>
        )
    }
}

export default Search;