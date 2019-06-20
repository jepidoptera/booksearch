import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API"; //loads API Component
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: []
  };
  
//  Load "loadBooks" when component mounts

    componentDidMount() {
        this.loadBooks();
    }

    // Add code here to get all books from the database and save them to this.state.books
    loadBooks() {
        API.getBooks()
        .then(res => {
            // console.log("books:", books);
            this.setState({ books: res.data });
        })
    };

    updateForm = (event) => {
        let { name, value } = event.target;
        console.log(event.target.name, event.target.value);
        // update state with new info from input form
        this.setState({
            [name]: value,
        })
    };

    submitForm = (event) => {
        event.preventDefault();
        console.log("author, title, synopsis: ", event.target.title.value, event.target.author.value, event.target.synopsis.value);
        let newBook = {
            title: this.state.title,
            author: this.state.author,
            synopsis: this.state.synopsis
        }
        API.saveBook(newBook)
        console.log("added: ", newBook);
        event.target.title.value = "";
        event.target.synopsis.value = "";
        event.target.author.value = "";
        this.loadBooks();
    }

    deleteBook = (id) => {
        // delete a particular book
        API.getBook(id).then(res => {
            const book = res.data;
            if (!alert(`Delete ${book.title}?`)) return;
            console.log("deleting book: ", book);
            API.deleteBook(id)
                .then(() => { console.log("book deleted."); this.loadBooks() })
                .catch(err => console.log(err))
        })
    }

    render() {
        return (
        <Container fluid>
            <Row>
            <Col size="md-6">
                <Jumbotron>
                <h1>What Books Should I Read?</h1>
                </Jumbotron>
                <form onChange={this.updateForm} onSubmit={this.submitForm}>
                <Input name="title" placeholder="Title (required)" />
                <Input name="author" placeholder="Author (required)" />
                <TextArea name="synopsis" placeholder="Synopsis (Optional)" />
                <FormBtn>Submit Book</FormBtn>
                </form>
            </Col>
            <Col size="md-6 sm-12">
                <Jumbotron>
                <h1>Books On My List</h1>
                </Jumbotron>
                {this.state.books.length ? (
                <List>
                    {this.state.books.map(book => (
                    <ListItem key={book._id}>
                        <a href={"/books/" + book._id}>
                        <strong>
                            {book.title} by {book.author}
                        </strong>
                        </a>
                        <DeleteBtn onClick={() => {this.deleteBook(book._id)}} />
                    </ListItem>
                    ))}
                </List>
                ) : (
                <h3>No Results to Display</h3>
                )}
            </Col>
            </Row>
        </Container>
        );
    }
}

export default Books;
