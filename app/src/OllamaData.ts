class OllamaData {
    private serverDns: string;
    private generatePath: string;
    private tagsPath: string;

    constructor(serverDns: string) {
        this.serverDns = serverDns;
        this.generatePath = "api/generate";
        this.tagsPath = "api/tags";
    }

    public getDnsAndPort(): string {
        return this.serverDns;
    }

    public getFullAddressGenerate(): string {
        return `http://${this.serverDns}/${this.generatePath}`;
    }

    public getFullAddressTags(): string {
        return `http://${this.serverDns}/${this.tagsPath}`;
    }

    public updateServerDns(serverDns: string): OllamaData {
        this.serverDns = serverDns;
        return this;
    }

    public getQueryObject(model: string, prompt: string): any {
        return { 
            model: model, 
            prompt: prompt, 
            stream: true 
        }
    }
}

export default OllamaData;