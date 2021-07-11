class UserHighlight {
  constructor(userHighlight) {
    this.userId = userHighlight["userId"],
    this.highlightId = userHighlight["highlightId"]
  }

  static all = []

  static createNewUserHighlight(json) {
    debugger;
  // this happens right after a new Highlight is created
    const data = {
      user_highlight: {
        user_id: json.userId,
        highlight_id: json.id
      } 
    }

    fetch(`http://localhost:3000/users/${data["user_id"]}/user_highlights`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then( resp => resp.json())
    .then( json => {
      if (json[0].id) {
        document.querySelector("div#background-div").parentElement.classList.add("hidden")
        document.querySelector("div#background-div").remove();
      }
    })
  }

  static createUserHighlights(json) {
    UserHighlight.all = []
    json.forEach( userHighlight => {
      let newObject = {}

      newObject["userId"] = userHighlight.user_id
      newObject["highlightId"] = userHighlight.highlight_id

      let newUserHighlight = new UserHighlight(newObject);
      UserHighlight.all.push(newUserHighlight)
    })
  
  }

  static disableHighlightsThatAreNotUserHighlights() {
    const currentUserId = document.querySelector("div#current-user-info").dataset.currentUser
    fetch(`http://localhost:3000/users/${currentUserId}/user_highlights`)
    .then(resp => resp.json())
    .then(json => UserHighlight.createUserHighlights(json))
    .then(x => UserHighlight.disableHighlights())
  }

  static disableHighlights() {
    const highlights = document.querySelectorAll(".all-highlights")
    const highlightIdsForUserHighlights = UserHighlight.all.map( uh => uh.highlightId)

    highlights.forEach( highlight => {
      if (!highlightIdsForUserHighlights.includes(parseInt(highlight.dataset.highlightId))) {

        const newHighlight = highlight.cloneNode(true)
        highlight.parentNode.replaceChild(newHighlight, highlight)
        newHighlight.classList.remove("hover:underline")
        newHighlight.classList.add("text-opacity-40")
        newHighlight.addEventListener("click", function() {
          alert("Play Whack-A-Rival to unlock Highlights")
        })
      }
    })
  }
}