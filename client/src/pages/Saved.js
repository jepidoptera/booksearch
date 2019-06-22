import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import "../css/pages.css"
import BookCard from "../components/BookCard"
import Nav from "../components/Nav";
import MessageBar from "../components/MessageBar";

class Saved extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        // get books from Mongo
        // however that works
        API.getBooks().then(books => {
            console.log("loaded saved books: ", books);
            this.setState({ books: books.data });
        }).catch(err => {
            console.log("error: ", err);
        })
    }

    deleteBook(self, book) {
        API.deleteBook(book._id).then(data => {
            document.getElementById(data.data._id).parentNode.remove();
            self.setState({ message: `"${book.title}" removed from archive.` });
            setTimeout(() => {
                self.setState({ message: "" });
            }, 1000);
            console.log("deleted:", data);
        }).catch(err => {
            console.log("error:", err);
        })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <MessageBar message={this.state.message} />
                        <Nav selected="saved" />
                        <h3>Saved Books</h3>
                        <hr></hr>
                        Click title to see book synopsis.  Click image to view book content.
                        <br></br>
                    </div>
                </div>
                <div className="row">
                <br></br>

                    {/* books results */}
                    {this.state.books.map((book, i) => {
                        return (
                            <div className="col-xs-12 col-md-6 col-lg-4" key={i}>
                                <BookCard {...book} button={{ text: "delete", function: (book) => { console.log("id: " + book.id); this.deleteBook(this, book) } }} key={i}></BookCard>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Saved;