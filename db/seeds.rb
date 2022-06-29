puts "Clearing previous seeds..."

Category.destroy_all
User.destroy_all
Ticket.destroy_all

puts "Finished clearing previous seeds!"

puts "Seeding categories..."

urgent = Category.create(title: "URGENT");
meetings = Category.create(title: "Meetings");
toDo = Category.create(title: "To Do");
inProgress = Category.create(title: "In Progress");
needsReview = Category.create(title: "Needs Review");

puts "Finished seeding categories!"


puts "Seeding users..."

brad = User.create(username: "brad", email: "brad@bradbieselin.com", password: "test");
sarah = User.create(username: "sarah", email: "sheldrickse@gmail.com", password: "test");
tom = User.create(username: "tom", email: "tom@gmail.com", password: "test");

puts "Finished seeding users!"


puts "Seeding tickets..."

Ticket.create(title: "Monday meeting", user_id: brad.id, category_id: meetings.id, description: "Meeting to discuss X : 10:15am");
Ticket.create(title: "FIX BUG", user_id: sarah.id, category_id: urgent.id, description: "FIX BUG breaking everything");
Ticket.create(title: "Update UI", user_id: tom.id, category_id: inProgress.id, description: "Updating UI");
Ticket.create(title: "Tuesday meeting", user_id: brad.id, category_id: meetings.id, description: "Meeting to discuss X : 9am");
Ticket.create(title: "Tuesday meeting", user_id: sarah.id, category_id: meetings.id, description: "Meeting to discuss X : 9am");
Ticket.create(title: "App release", user_id: brad.id, category_id: needsReview.id, description: "New app release");

puts "Finished seeding tickets!"