class CreateRatings < ActiveRecord::Migration[6.1]
  def change
    create_table :ratings do |t|
      t.integer :user_id
      t.integer :color_id
      t.integer :score

      t.timestamps
    end
  end
end
