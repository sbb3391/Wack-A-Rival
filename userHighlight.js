class UserHighlight {
  constructor(comment) {
    this.commentText = comment["commentText"],
    this.username = comment["username"],
    this.userId = comment["userId"],
    this.createdAt = comment["createdAt"]
  }

  static all = []

  static createUserHighlights(json) {
    UserHighlight.all = []
    json.forEach( userHighlight => {
      let newObject = {}

      newObject["userId"] = userHighlight.user_id
      newObject["highlightId"] = userHighlight.highlight_id

      let newUserHighlight = new UserHighlight(newObject);
      UserHighlight.all.push(userHighlight)
    })
    debugger;
  }

  static disableHighlightsThatAreNotUserHighlights() {
    const currentUserId = document.querySelector("div#current-user-info").dataset.currentUser
    fetch(`http://localhost:3000/users/${currentUserId}/user_highlights`)
    .then(resp => resp.json())
    .then(json => UserHighlight.createUserHighlights(json))
  }
}