import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../components/Grid";
// import Jumbotron from "../components/Jumbotron";
// import API from "../utils/API";
import "../css/pages.css"
import BookCard from "../components/BookCard"

class Saved extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        // get books from Mongo
        // however that works
    }

    render() {
        return (
            <div>

                {/* search params */}
                <form id="searchForm"
                    onSubmit={(event) => this.formSubmit(this, event)}>

                    Title: <input name='title'></input><br></br>
                    <br></br>
                    Author: <input name='author'></input><br></br>
                    <br></br>
                    <button type="submit">try your luck</button>
                </form>

                <br></br>

                {/* books results */}
                {this.state.books.map((book, i) => {
                    return (
                        <BookCard {...book} key={i}></BookCard>
                    )
                })}

            </div>
        )
    }
}

export default Saved;