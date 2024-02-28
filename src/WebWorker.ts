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
        const blob = new Blob([this.source], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        this.worker = new Worker(url);

        console.log("worker " );

        // register the channel of variable in capturedCVS
        for (let key in this.cvs) {
            Channel.register(this.worker, key);
            //打印注册的通道
            console.log("register channel: " + key);

            Channel.handleMessage(key);
        }



    }

}

export default WebWorker;


