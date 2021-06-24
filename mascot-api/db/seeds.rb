# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Highlight.create([
  {
    media_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iDUO6z9wn-c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    description: "Relive a dissapointing loss to LSU in 2006, as #5 Arkansas loses at home to #9 LSU with a trip to Atlanta on the line. 189 and two TD's from Darren Mcfadden wasn't enough to topple the Tigers.",
    win_or_loss: "win",
    team_id: 3
    
  },
  {
    media_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Hv8kSOfoC54" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    description: "#3 Arkansas and #1 LSU showdown in Baton Rouge in 2011. LSU Runs away with this one scoring 17 unanswered in the 4th quarter, on their way to national Championship game.",
    win_or_loss: "win",
    team_id: 3
  }
])
