export default class DocumentTitleDynamic {
    private dotCount = 0;
    private titleInterval: ReturnType<typeof setInterval> | null = null;

    constructor(private baseTitle: string) {}

    start() {
        this.dotCount = 0;
        this.titleInterval = setInterval(() => {
            this.dotCount = (this.dotCount % 10) + 1;
            document.title = `Answering${'.'.repeat(this.dotCount)}`;
        }, 500);
    }

    stop() {
        if (this.titleInterval !== null) {
            clearInterval(this.titleInterval);
            this.titleInterval = null;
        }
        document.title = this.baseTitle;
    }
}
