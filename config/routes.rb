Rails.application.routes.draw do
  get 'books/index'
  get 'books/show'
  root 'homepage#index'

  get '/users', to: 'users#index'
  post '/users/create'


  get '/book_search', to:'books#index'
  post '/books/create'
  put '/books/update'
  delete '/books/destroy'


  get '/*path' => 'homepage#index'
end
