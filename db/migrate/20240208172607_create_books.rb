class CreateBooks < ActiveRecord::Migration[7.1]
  def change
    create_table :books do |t|
      t.references :user, null: false, foreign_key: true
      t.string :book_id, null: false
      t.string :shelf, null: false

      t.timestamps
    end
  end
end
