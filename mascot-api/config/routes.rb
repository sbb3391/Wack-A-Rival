Rails.application.routes.draw do

  resources :users
  root to: "sessions#index"
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
    end

    member do 
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
