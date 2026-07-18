export type ApiMode = 'chat' | 'generate';
import ChatSend from "types/ChatSend";
import GenerateSend from "types/GenerateSend";

class OllamaData {
    private serverDns: string;
    private generatePath = 'api/generate';
    private chatPath = 'api/chat';
    private tagsPath = 'api/tags';
    private ollamaStatistics = 'alooha_api/stats';

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

    public getFullAddressOllamaStatistics(): string {
        return `http://${this.serverDns}/${this.ollamaStatistics}`;
    }

    public updateServerDns(serverDns: string): OllamaData {
        this.serverDns = serverDns;
        return this;
    }

    public getQueryObject(
        mode: ApiMode, 
        model: string, 
        prompt: string,
        systemPrompt = ""
    ): ChatSend | GenerateSend {
        const messages = []
        if (systemPrompt !== "") {
            messages.push({ role: 'system', content: systemPrompt });    
        }
        messages.push({ role: 'user', content: prompt });

        if (mode === 'chat') {
            return { 
                model, 
                messages, 
                stream: true
            };
        }
        if (mode === 'generate') {
            return { model, prompt, system: systemPrompt, stream: true };
        }
        throw new Error("Wrong mode given.");
    }
}

export default OllamaData;