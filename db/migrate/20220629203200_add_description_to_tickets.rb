class AddDescriptionToTickets < ActiveRecord::Migration[7.0]
  def change
    add_column :tickets, :description, :string
  end
end
