Rails.application.routes.draw do

  resources :users do 
    resources :user_highlights
  end

  root to: "sessions#index"
  get '/sessions/autologin', to: 'sessions#autologin'
  resources :sessions
  resources :mascots
  resources :teams
  resources :highlights do 
    resources :comments
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
