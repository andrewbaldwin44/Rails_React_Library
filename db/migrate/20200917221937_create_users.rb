class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :userID, null: false
      t.string :username, null: false, default: :email

      t.timestamps
    end

    add_index :userID, :email, unique: true
  end
end
