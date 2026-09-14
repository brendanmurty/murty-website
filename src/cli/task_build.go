package main

func TaskBuild() {
	LogInfo("Starting build proccess")
	Cmd("deno task build")
	LogSuccess("Finished build process")
}
