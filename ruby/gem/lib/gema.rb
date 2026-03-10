require "pry"; binding.pry
gem 'pry-shell'

module gema
    def self.hello
        puts "Hello, world desde gema!"

    def pry
        x = 1
        binding.pry
        puts.inspect x
    end
end