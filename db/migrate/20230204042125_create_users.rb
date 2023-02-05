class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :avatar
      t.string :user_id

      t.timestamps
    end
  end
end
