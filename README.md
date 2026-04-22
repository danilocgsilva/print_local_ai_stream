# Print local AI stream

To run the project:

* Have the Ollama server installed locally, or at least have its api acessible: https://ollama.com/download
* Download at least one model to teh Ollama. If you have none in mind, I recommend `gemma3:4b`, as it have a descent quality and still lightweight.
* Docker also need to be installed in the computer.

Then, just build with the command:
```
docker compose up -d --build
```
After it is completely compiled, you can access `http://localhost:8080` and try.

