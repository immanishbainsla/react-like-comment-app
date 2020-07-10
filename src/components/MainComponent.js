import React from "react";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuidv4 from "uuid/v4";

// or
// import 'font-awesome/css/font-awesome.min.css';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          id: uuidv4(),
          name: "Manish",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
          upvotes: 0,
          downvotes: 0,
        },
      ],
    };
    this.handleUpClick = this.handleUpClick.bind(this);
    this.handleDownClick = this.handleDownClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const json = localStorage.getItem("comments");
    const comments = JSON.parse(json);
    if (comments) this.setState({ comments: comments });
  }

  componentDidUpdate() {
    const comments = JSON.stringify(this.state.comments);
    localStorage.setItem("comments", comments);
  }

  handleUpClick(id) {
    this.setState({
      comments: this.state.comments.map((comment) => {
        if (comment.id === id) {
          comment.upvotes = comment.upvotes + 1;
        }
        return comment;
      }),
    });
    console.log("UpVoted");
  }

  handleDownClick(id) {
    this.setState({
      comments: this.state.comments.map((comment) => {
        if (comment.id === id) {
          comment.downvotes = comment.downvotes + 1;
        }
        return comment;
      }),
    });
    console.log("DownVoted");
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.name.value === "" || event.target.comment.value === "") {
      console.log("Please fill form correctly!");
      return;
    }
    console.log("Form Submitted Successfully!");

    const name = event.target.name.value;
    const comment = event.target.comment.value;
    const newComment = {
      id: uuidv4(),
      name: name,
      comment: comment,
      upvotes: 0,
      downvotes: 0,
    };
    console.log(newComment);
    this.setState({
      comments: [...this.state.comments, newComment],
    });
  }

  render() {
    const comment = this.state.comments.map((cmnt) => {
      return (
        <div className="row pl-4 pr-4 pb-4" key={cmnt.id}>
          <div className="col-md-12">
            <span className="lead">Author : {cmnt.name}</span> <br />{" "}
            {cmnt.comment}
          </div>
          <div className="col-md-12 d-flex justify-content-start pt-1">
            <span className="pr-2">
              <button className="" onClick={() => this.handleUpClick(cmnt.id)}>
                <span className="up">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
              </button>{" "}
              {cmnt.upvotes} upvotes
            </span>{" "}
            <span className="pl-2">
              <button
                className=""
                onClick={() => this.handleDownClick(cmnt.id)}
              >
                <span className="down">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </span>
              </button>{" "}
              {cmnt.downvotes} downvotes
            </span>
          </div>
          <br />
        </div>
      );
    });
    return (
      <>
        <form className="mb-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name here..."
              className="form-control"
              required
            />
            <br />
            <textarea
              className="form-control"
              name="comment"
              id="exampleFormControlTextarea1"
              rows="5"
              placeholder="Type your comment here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-lg btn-danger">
            Post Comment
          </button>
        </form>
        <div className="pt-4">
          <div className="row">{comment}</div>
        </div>
      </>
    );
  }
}

export default MainComponent;
