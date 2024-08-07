# Test

# Setup the message colour characters

blue="\033[0;34m"
yellow="\033[0;33m"
red="\033[0;31m"
end="\033[0m"

# Build site to test the output

echo -e "${yellow}Building the site to prepare for tests${end}"

deno task build

# Run all of the tests, allow these test scripts to also
# run other Deno scripts and ignore any console output from them

echo -e "${yellow}Running all tests${end}"

deno test --allow-run --allow-env --allow-read --allow-net src --quiet
