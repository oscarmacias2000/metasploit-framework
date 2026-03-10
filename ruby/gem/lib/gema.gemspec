Gem::Specification.new do |spec|
  spec.name          = "gema"
  spec.version       = "0.1.0"
  spec.authors       = ["Your Name"]
  spec.email         = ["modules@metasploit"]
  spec.summary       = "A simple Ruby gem example."
  spec.description   = "This is a simple Ruby gem example that demonstrates how to create a gem and include a module with a method."
  spec.homepage      = "https://example.com/gema"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
            
  # Specify any dependencies here
  # spec.add_dependency "some_gem", "~> 1.0"
end