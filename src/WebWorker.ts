import ChannelCenter from "./ChannelCenter";

abstract class WebWorker {
    protected abstract source: string;
    protected abstract __captured_cvs: any;
    protected worker: Worker | null = null;

    start() {
        if (this.worker)
            return

        const workerBlob = new Blob([`
// 一个简单的worker，当接受到{ command: 'start', source }消息时，会执行source中的代码
let workerPort;
let objectMap = new Map();
let onPort = (ev) => {
    let data = ev.data;
    let command = data.command;
    if (command === 'update') {
        objectMap.set(data.key, data.value);
        console.log(\`receive a update of key: \${ev.data.key}\`);
    }
}
self.onmessage = (event) => {
    let data = event.data
    let command = data.command;
    switch (command) {
        case 'start':
            const func = new Function(data.source);
            func();
            break;
        case 'connect':
            workerPort = event.ports[0];
            console.log('connected!');
            workerPort.onmessage = onPort;
            break;
        default:
            console.log('Received unknown command:', event.data.command);
    }
};
      `], { type: 'application/javascript' });

        // initialize worker
        const url = URL.createObjectURL(workerBlob);
        this.worker = new Worker(url);

        // register the channel of variable in capturedCVS
        for (let key in this.__captured_cvs) {
            ChannelCenter.register(this.worker, key);
        }

        this.worker.postMessage({ command: 'start', source: this.source })
    }
}

export default WebWorker;