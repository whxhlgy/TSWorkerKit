import Channel from './Channel';
abstract class WebWorker {
    protected abstract source: string;
    protected worker: Worker | null = null;
    protected abstract cvs: any ;
    //protected channel:Channel = new Channel();
   // protected port: MessagePort | null = null;
    start() {
        if (this.worker)
            return

        // initialize worker
        const blob = new Blob([`
        let workerPorts = {};

        self.onmessage = ev => {
            if (ev.data.command === 'connect') {
                //workerPort = ev.ports[0];
                let name = ev.data.name;
                workerPorts[name] = ev.ports[0];
                console.log('connected:'+name);
            }
            if (ev.data.command === 'start') {
                const func = new Function(ev.data.source);
                func();
            }    
            if (ev.data.command === 'update') {
                let name =  '__' + ev.data.name;
                console.log('update:'+ev.data.name);
                console.log(ev.data.value);
                // 遍历更新数据中的属性
                for (let prop in ev.data.value) {
                    if (ev.data.value.hasOwnProperty(prop)) {
                        // 如果属性存在于 __Desk 类中，则更新它
                        if (self[name].hasOwnProperty(prop)) {
                            self[name][prop] = ev.data.value[prop];
                        }
                    }
                }     
            }
        }
`], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        this.worker = new Worker(url);
        // register the channel of variable in capturedCVS
        for (let key in this.cvs) {
            Channel.register(this.worker, key);
            let name=this.constructor.name;
            //打印注册的通道
            console.log("register channel: " + key+" in "+name);
            //主线程开始监听
            Channel.handleMessage(key);
        }
        this.worker.postMessage({ command: 'start', source: this.source })
    }

}

export default WebWorker;


