package main

func TaskStart() {
	LogInfo("Installing dependencies")
	Cmd("deno task install")

	LogInfo("Building the site")
	TaskBuild()

	LogSuccess("Server starting at " + EnvGetUrl())
	Cmd("deno task serve")
}
