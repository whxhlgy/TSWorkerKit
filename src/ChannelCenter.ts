class ChannelCenter {
    // every worker holds a channel
    private static channels: Map<string, Set<MessagePort>> = new Map();
    // A map for recording registered worker to prevent duplicate registration
    private static workerToPort: Map<Worker, MessagePort> = new Map();

    // register the key to channels
    static register(worker: Worker, key: string) {
        let port: MessagePort;
        if (!this.workerToPort.has(worker)) {
            let channel = new MessageChannel();
            this.workerToPort.set(worker, channel.port1);
            // notify the worker to connect
            worker.postMessage({ 'command': 'connect' }, [ channel.port2 ]);
        }

        port = this.workerToPort.get(worker)!;

        if (!this.channels.has(key)) {
            this.channels.set(key, new Set());
        }
        this.channels.get(key)!.add(port);
    }
}

export default ChannelCenter;