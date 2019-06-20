const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const axios = require("axios");
const apiKey = "AIzaSyC1Am6oiF0GT43XGNjCDzExBHJdu_PfLKM";

// Matches with "/api/books"
router.route("/")
    .get(booksController.findAll)
    .post(booksController.create);

router.route("/search")
    .get(function (req, res) {
        var title = req.query.title;
        var author = req.query.author;
        console.log("searching....");
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}&key=${apiKey}`)
        .then(data => {
            // console.log(data);
            res.status(200).json(data.data.items.map(item => {
                // pull the important parts together into one simpler object
                return {
                    // ...{ key: item.accessInfo.key },
                    ...item.volumeInfo
                };
            }));
        }).catch(err => {
            console.log("error: " + err);
            res.end();
        })
    });
// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(booksController.findById)
    .put(booksController.update)
    .delete(booksController.remove);

module.exports = router;
