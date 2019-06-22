import React, {Component} from "react";
import "./style.css";

class BookCard extends Component {
    componentDidMount() {
        console.log(this.props.children);
    }

    openBook(bookLink) {
        window.open(bookLink, "_blank");
    }

    viewDescription(event) {
        // did we get the right object?
        console.log(event.target.parentNode);
        console.log(event.target.parentNode.parentNode.parentNode.childNodes);
        // there it is. shrink it to nothing
        let header = event.target.parentNode.parentNode;
        header.style.bottom = "100%";
        header.style.position = "relative";
        let descriptor = event.target.parentNode.parentNode.parentNode.childNodes[1];
        descriptor.style.height = "90%";
        // descriptor.style.border = "1px solid black";
        descriptor.style.overflow = "scroll";
        descriptor.style.top = "0px";
    }

    closeDescription(event) {
        let header = event.target.parentNode.childNodes[0];
        header.style = {};
        let descriptor = event.target;
        descriptor.style = {};
    }

    render() {
        let book = this.props;

        return (<div className="bookCard" id={book._id}>
            {/* main section, initially visible */}
            <div className="bookTitleAndImage">
                <div className="titleSection">
                    <h3 onClick={this.viewDescription} style={{ cursor: "default"}}>{book.title}</h3>
                    <h4>{book.subtitle || ""}</h4>
                    {book.authors ? (book.authors.length > 1
                        ? "Authors: "
                        : "Author: "
                    ) : ""}
                    {book.authors ? book.authors.reduce((authors, author, i) => {
                        return authors + (i === 0
                            ? author
                            : ", " + author
                        )
                    }) : ""}
                </div>
                <hr></hr>
                <div className="cardImgContainer">
                    <img className="cardImg"
                        onClick={() => this.openBook(book.previewLink)}
                        src={book.thumbnail || ""}
                        alt={book.title}>
                    </img>
                </div>
            </div>
            {/* starts hidden */}
            <div className="bookDescription" onClick={this.closeDescription}>
                {book.description ? book.description : "no synopsis available"}
            </div>
            <button className="saveButton" onClick={() => book.button.function(book)}>{book.button.text}</button>
        </div>) 
    }
}
export default BookCard;