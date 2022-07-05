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

100.times do
    User.create(
        username: Faker::Internet.username,
        email: Faker::Internet.email,
        password: Faker::Internet.password
    )
end

puts "Finished seeding users!"


puts "Seeding tickets..."

40.times do
    Ticket.create(
        title: Faker::Marketing.buzzwords,
        user_id: Faker::Number.between(from: 1, to: 100),
        category_id: Faker::Number.between(from: 1, to: 5),
        description: Faker::Company.catch_phrase
    )
end

puts "Finished seeding tickets!"