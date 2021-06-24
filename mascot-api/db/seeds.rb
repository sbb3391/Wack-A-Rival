# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Highlight.create([
  {
    media_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/xa66g7SF9mc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    description: "Throw some salt on the wound with one of the toughest Arkansas losses in recent decades. Arkansas lead #1 and eventual national champion Alabama 20-7 deep in the third quarter. Two 4th quarter interceptions by Ryan Mallet let the Tide squeak out of Fayetteville with the victory. What might have been...",
    win_or_loss: "win",
    team_id: 1
    
  },
  {
    media_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/KdEKW374fCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
    description: "Avoid if you have a weak stomach. Alabama crushes the Hogs 48-7 in 2019 as the Chad Morris Era spirals. Ouch.",
    win_or_loss: "win",
    team_id: 1
  }
])
