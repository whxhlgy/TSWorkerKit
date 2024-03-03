class ChannelCenter {
    // every worker holds a channel
    //private static channels: Map<string, Set<MessagePort>> = new Map();
    // 此map仅为防止创建重复channel
    //private static workerToPort: Map<Worker, MessagePort> = new Map();
    //cvs对应的workers
    private static cvsToWorkers: Map<string, Set<Worker>> = new Map();
    private static workerTocvs: Map<Worker, Set<string>> = new Map();


    static register(worker: Worker, __captured_cvs: Set<string>) {
        //worker第一次注册
        if(!this.workerTocvs.has(worker)){
            this.workerTocvs.set(worker,__captured_cvs);
        }
        for(let w of this.workerTocvs.keys()){
            if(worker!=w){
                let scvs = this.getscvs(__captured_cvs,this.workerTocvs.get(w)!);
                if (scvs.size>0) {
                    let channel = new MessageChannel();
                    w.postMessage({'command': 'connect',"scvs":scvs}, [channel.port2]);
                    worker.postMessage({'command': 'connect',"scvs":scvs}, [channel.port1]);
                    console.log(`connect `)
                }


                // let connectedFlag = false;
                // let keys = this.workerTocvs.get(worker)!;
                // let channel;
                // for(let k of keys){
                //     if(this.workerTocvs.get(w)!.has(k)){
                //
                //         if(connectedFlag==false){
                //             channel = new MessageChannel();
                //             connectedFlag = true;
                //             w.postMessage({'command': 'connected',"worker":worker}, [channel!.port2]);
                //             worker.postMessage({'command': 'connected',"worker":w}, [channel!.port1]);
                //         }
                //         //发送共享变量信息
                //         w.postMessage({'command': 'sendcvs',"worker":worker,"key":k});
                //         worker.postMessage({'command': 'sendcvs',"worker":w,"key":k});
                //     }
                //
                //
                // }
            }
        }
    }
     static getscvs(cvs1: Set<string>,cvs2: Set<string>){
        let result = new Set();
        for(let c of cvs1){
            if(cvs2.has(c)){
                result.add(c);
            }
        }
        return result;
    }

    // static register(worker: Worker, key: string) {
    //     // 如果这个cvs对应的worker集合不存在，创建一个
    //     if (!this.cvsToWorkers.has(key)) {
    //         this.cvsToWorkers.set(key, new Set());
    //     }
    //     // 将worker放入cvsToWorkers[key]
    //     this.cvsToWorkers.get(key)!.add(worker);
    //     //worker与Set中所有worker建立channel
    //     for (let w of this.cvsToWorkers.get(key)!) {
    //         if (w !== worker) {
    //             let channel = new MessageChannel();
    //             w.postMessage({'command': 'connect', 'key': key}, [channel.port2]);
    //             worker.postMessage({'command': 'connect', 'key': key}, [channel.port1]);
    //             console.log(`connect ${key} to ${w}`)
    //         }
    //     }
    // }

}

export default ChannelCenter;
