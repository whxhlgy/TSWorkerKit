import ChannelCenter from "./ChannelCenter";

abstract class WebWorker {
    protected abstract source: string;
    protected abstract __captured_cvs: any;
    protected worker: Worker | null = null;

    start() {
        if (this.worker)
            return

        // initialize worker
        this.worker = new Worker('../src/initWorker.js');

        // register the channel of variable in capturedCVS
        for (let key in this.__captured_cvs) {
            ChannelCenter.register(this.worker, key);
        }

        this.worker.postMessage({ command: 'start', source: this.source })
    }
}

export default WebWorker;