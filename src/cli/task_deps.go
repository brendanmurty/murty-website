package main

func TaskDeps() {
	LogInfo("Updating Deno dependencies")
	Cmd("deno task update")

	LogInfo("Updating Go dependencies")
	Cmd("cd src/cli && go get -u -t ./... && go mod tidy")

	LogWarn("Finished dependency updates, check updated files")
}
