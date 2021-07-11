class HighlightComment {
  constructor(comment) {
    this.commentText = comment["commentText"],
    this.username = comment["username"],
    this.userId = comment["userId"],
    this.createdAt = comment["createdAt"]
  }

  static all = []

  static createComment(commentData) {
    let comment = {}

    comment["commentText"] = commentData.comment_text
    comment["username"] = commentData.username
    comment["userId"] = commentData.user_id
    comment["createdAt"] = commentData.created_at

    let newComment = new HighlightComment(comment);
    HighlightComment.all.push(newComment)
  }

  static createNewComment(highlightId, userId, commentText) {

    const data = {
      comment: {
        comment_text: commentText,
        user_id: userId,
        highlight_id: highlightId
      } 
    }

    fetch(`http://localhost:3000/highlights/${data["user_id"]}/comments`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then( resp => resp.json())
    .then( json => {
      
      if (json.id) {
        HighlightComment.createComment(json)

        HighlightComment.appendNewComment("afterbegin", HighlightComment.all[HighlightComment.all.length - 1])
        HighlightComment.all = []
        document.querySelector("form#new-comment-form").querySelector("textarea").value = ""
      }
    })
  }

  static getAllCommentsSortedNewestToOldest(commentsArray) {
    commentsArray.forEach( comment => HighlightComment.createComment(comment.attributes))
  }

  static appendNewComment(insertPosition, comment) {
    let newCommentDiv = document.createElement("div")
    newCommentDiv.dataset.userId = comment.userId
    newCommentDiv.className = "w-5/6 border-b-2 border-black flex flex-col space-y-1 p-2"
    newCommentDiv.innerHTML = `
      <div class="flex space-x-8">
        <span class="text-xs">${comment.username} says...</span>
        <span class="text-xs">${new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      <p class="text-md">${comment.commentText}</p>
    `

    document.querySelector("div#comments-div").insertAdjacentElement(insertPosition, newCommentDiv)
  }
}