class Channel {
    static channels: { [name: string]: MessagePort } ={}; // 用于存储每个通道的端口
    static values: { [name: string]: any } = {}; // 用于存储每个通道的值
    constructor() {
    }

    static register(worker: Worker, name: string): void {
        // 创建通道
        const channel = new MessageChannel();

        // 保存通道端口
        this.channels[name] = channel.port1;
        // 保存通道值
        this.values[name] = null;

        // 向 worker 发送 port2
        worker.postMessage({
            command: 'connect',
            name: name,
            port: channel.port2
      }, [channel.port2]);
        //打印端口
        //console.log(channel.port2);
    }

    static sendMessage(name: string, message: any): void {
        const port = this.channels[name];
        if (port) {
            port.postMessage(message);
        } else {
            console.error(`Channel '${name}' not found.`);
        }
    }



    static handleMessage(name: string): void {
        const port = this.channels[name];
        if (port) {
            port.onmessage = (event) => {
                console.log(`Received message from Channel '${name}':`);
                //console.log(event.data);
                switch (event.data.command) {
                    case 'set':
                        this.update(name, event.data.value);
                        this.sendMessage(name, { command: 'update', value: this.values[name] });
                        break;

                }
            };
        } else {
            console.error(`Channel '${name}' not found.`);
        }
    }

    static update(name: string, value: any): void {
        const port = this.channels[name];
        this.values[name] = value;
        console.log(`Value of Channel '${name}' updated to:`, value);
        //port.postMessage();

    }

    public getPort(name: string): MessagePort | undefined {
        return Channel.channels[name];
    }
}



export default Channel;