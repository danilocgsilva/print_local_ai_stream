import OllamaData from "./OllamaData";

class OllamaClient {
    private ollamaData: OllamaData;
    private abortController: AbortController | null = null;

    constructor(ollamaData: OllamaData) {
        this.ollamaData = ollamaData;
    }

    public async getModels(): Promise<string[]> {
        const res = await fetch(this.ollamaData.getFullAddressTags());
        const data = await res.json();
        const models = data.models.map((m: { name: string }) => m.name);
        return models;
    }

    public updateHostAndDns(hostAndDns: string): OllamaClient {
        this.ollamaData.updateServerDns(hostAndDns);
        return this;
    }

    public async getResponse(model: string, prompt: string) {
        this.abortController = new AbortController();
        const response = await fetch(this.ollamaData.getFullAddressGenerate(), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            this.ollamaData.getQueryObject(model, prompt)
          ),
          signal: this.abortController.signal,
        });

        return response;
    }

    public abort() {
        this.abortController?.abort();
    }

    public cleanAbord() {
        this.abortController = null;
    }
}

export default OllamaClient;