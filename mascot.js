class Mascot {
  constructor(mascot) {
    this.id = mascot["id"],
    this.name = mascot["name"]
    this.origin_description = mascot["origin_description"],
    this.cartoon_image_location = mascot["cartoon_image_location"],
    this.real_life_image_location = mascot["real_life_image_location"],
    this.team_id = mascot["team_id"]
  }

  static all = [];
}