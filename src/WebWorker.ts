import ChannelCenter from "./ChannelCenter";

abstract class WebWorker {
    protected abstract source: string;
    protected abstract __captured_cvs: any;
    protected worker: Worker | null = null;
    private cvsSet: Set<string> = new Set();
    start() {
        if (this.worker)
            return

        // initialize worker
        this.worker = new Worker('../src/initWorker.js');

        // register the channel of variable in capturedCVS
        for (let key in this.__captured_cvs) {
            this.cvsSet.add(key);
        }
        ChannelCenter.register(this.worker, this.cvsSet);
        setTimeout(() => {
            this.worker!.postMessage({ 'command': 'start', 'source': this.source });
        },2000)
    }
}

export default WebWorker;