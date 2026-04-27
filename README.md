# Print local AI stream

To run the project:

* Have the Ollama server installed locally, or at least have its api acessible: https://ollama.com/download
* Download at least one model for Ollama. If you have none in mind, I recommend `gemma3:4b`, as it have a descent quality and still lightweight.
* Docker also need to be installed in the computer.

Then, just build with the command:
```
docker compose up -d --build
```
After it is completely compiled, you can access `http://localhost:8099` and try.

**Note**: You can customize the port where to run the server copying `app/.env.example` into `app/.env` and `.env.example` into `.env` and setting a specific port other than the default - which is 8099.

## What you will found here

* Docker receipt
* node
* TypeScript
* Vue.js 3
* Switching between light and dark theme
* Tailwind
* Local compilation with Vite
* Friendly to remote development
* DevContainer recipe
* Ready to VS Codium
* HMR working, even in remote machine
