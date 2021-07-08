class HighlightComment {
  constructor(comment) {
    this.commentText = comment["commentText"],
    this.username = comment["username"],
    this.userId = comment["userId"],
    this.createdAt = comment["createdAt"]
  }

  static createComment(commentData) {
    let comment = {}

    comment["commentText"] = commentData.comment_text
    comment["username"] = commentData.username
    comment["userId"] = commentData.user_id
    comment["createdAt"] = commentData.created_at

    let newComment = new HighlightComment(comment);
    HighlightComment.all.push(newComment)
  }

  static all = []

  static getAllCommentsSortedNewestToOldest(commentsArray) {
    HighlightComment.all = []

    commentsArray.forEach( comment => HighlightComment.createComment(comment.attributes))
  }
}