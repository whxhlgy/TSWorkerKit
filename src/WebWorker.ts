import ChannelCenter from "./ChannelCenter";

abstract class WebWorker {
    protected abstract source: string;
    protected abstract __captured_cvs: any;
    protected worker: Worker | null = null;

    start() {
        if (this.worker)
            return

        // Append the snippet to the source code
        // this snippet enables a port in a worker
        const modifiedSource =
            `
            // let workerPort;
            // self.onmessage = ev => {
            //     if (ev.data.command === 'connect') {
            //         workerPort = ev.ports[0];
            //         console.log('connected!');
            //     }
            // }; 
            ` + this.source;

        // initialize worker
        const blob = new Blob([modifiedSource], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        this.worker = new Worker(url);

        // register the channel of variable in capturedCVS
        for (let key in this.__captured_cvs) {
            ChannelCenter.register(this.worker, key);
    }
    }
}

export default WebWorker;