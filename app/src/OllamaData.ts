export type ApiMode = 'chat' | 'generate';

class OllamaData {
    private serverDns: string;
    private generatePath = 'api/generate';
    private chatPath = 'api/chat';
    private tagsPath = 'api/tags';

    constructor(serverDns: string) {
        this.serverDns = serverDns;
    }

    public getDnsAndPort(): string {
        return this.serverDns;
    }

    public getFullAddress(mode: ApiMode): string {
        return `http://${this.serverDns}/${mode === 'chat' ? this.chatPath : this.generatePath}`;
    }

    public getFullAddressTags(): string {
        return `http://${this.serverDns}/${this.tagsPath}`;
    }

    public updateServerDns(serverDns: string): OllamaData {
        this.serverDns = serverDns;
        return this;
    }

    public getQueryObject(mode: ApiMode, model: string, prompt: string): Record<string, unknown> {
        if (mode === 'chat') {
            return { model, messages: [{ role: 'user', content: prompt }], stream: true };
        }
        if (mode === 'generate') {
            return { model, prompt, stream: true };
        }
        throw new Error("Wrong mode given.");
    }
}

export default OllamaData;