# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
meetings = Category.create(title: "Meetings");

brad = User.create(name: "brad", email: "brad@bradbieselin.com");

Ticket.create(title: "Monday meeting", user_id: brad.id, category_id: meetings.id);