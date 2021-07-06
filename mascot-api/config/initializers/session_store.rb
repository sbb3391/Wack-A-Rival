
if Rails.env === "production"
  Rails.application.config.session_store :cookie_store, key: '_whack_a_rival_app'
else 
  Rails.application.config.session_store :cookie_store, key: '_whack_a_rival_app'
end