Rails.application.routes.draw do
  root 'homepage#index'

  get '/users', to: 'users#index'
  post '/users/create'

  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
