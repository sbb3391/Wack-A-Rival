Rails.application.routes.draw do

  resources :user_highlights
  resources :comments
  resources :users
  root to: "sessions#index"
  get '/sessions/autologin', to: 'sessions#autologin'
  resources :sessions
  resources :mascots
  resources :teams
  resources :highlights do 
    collection do
      post :team_highlights
    end
  end

  resources :sessions do 
    collection do 
      post :login
      post :logout
      get :autologin
    end

    member do 
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
