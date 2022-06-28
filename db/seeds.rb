puts "Clearing previous seeds..."

Category.destroy_all
User.destroy_all
Ticket.destroy_all

puts "Finished clearing previous seeds!"

puts "Seeding categories..."

meetings = Category.create(title: "Meetings");
urgent = Category.create(title: "URGENT");
toDo = Category.create(title: "To Do");
inProgress = Category.create(title: "In Progress");
needsReview = Category.create(title: "Needs Review");

puts "Finished seeding categories!"


puts "Seeding users..."

brad = User.create(name: "brad", email: "brad@bradbieselin.com");
sarah = User.create(name: "sarah", email: "sheldrickse@gmail.com");
tom = User.create(name: "tom", email: "tom@gmail.com");

puts "Finished seeding users!"


puts "Seeding tickets..."

Ticket.create(title: "Monday meeting", user_id: brad.id, category_id: meetings.id);

puts "Finished seeding tickets!"