Rails.application.routes.draw do
  get 'books/index'
  get 'books/show'
  root 'homepage#index'

  get '/users', to: 'users#index'
  post '/users/create'

  get '/book_search', to:'books#index'

  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
