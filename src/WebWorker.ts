abstract class WebWorker {
    protected abstract source: string;
    protected worker: Worker | null = null;

    start() {
        if (this.worker)
            return

        // initialize worker
        const blob = new Blob([this.source], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        this.worker = new Worker(url);
    }
}

export default WebWorker;