class Comment {
  constructor(comment) {
    this.commentText = comment["description"],
    this.commentUser = comment["id"]
  }

  static createComment(commentData) {
    let comment = {}

    comment["commentText"] = commentData.attributes.description,
    comment["commentUser"] = commentData.attributes.media_url

    let newComment = new Comment(comment);
    return newComment;
  }
}