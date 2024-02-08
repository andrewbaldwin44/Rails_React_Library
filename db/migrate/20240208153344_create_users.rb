class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :display_name
      t.string :profile_picture
      t.string :uuid, null: false

      t.timestamps
    end
    add_index :users, :email, unique: true
  end
end
