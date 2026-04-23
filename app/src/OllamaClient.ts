import OllamaData from "./OllamaData";

class OllamaClient {
    private ollamaData: OllamaData;
    private hostAndDns: string;
    constructor(hostAndDns: string) {
        this.hostAndDns = hostAndDns;
        this.ollamaData = new OllamaData(this.hostAndDns);
    }

    public async getModels(): Promise<string[]> {
        const res = await fetch(this.ollamaData.getFullAddressTags());
        const data = await res.json();
        const models = data.models.map((m: { name: string }) => m.name);
        return models;
    }
}

export default OllamaClient;