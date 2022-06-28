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

brad = User.create(username: "brad", email: "brad@bradbieselin.com", password: "test");
sarah = User.create(username: "sarah", email: "sheldrickse@gmail.com", password: "test");
tom = User.create(username: "tom", email: "tom@gmail.com", password: "test");

puts "Finished seeding users!"


puts "Seeding tickets..."

Ticket.create(title: "Monday meeting", user_id: brad.id, category_id: meetings.id);
Ticket.create(title: "Tuesday meeting", user_id: brad.id, category_id: meetings.id);

puts "Finished seeding tickets!"