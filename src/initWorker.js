

// 一个简单的worker，当接受到{ command: 'start', source }消息时，会执行source中的代码
//一个cvs对应一个port集合
let workerPorts = {};
let workerPortsToCvs = new Map();

//cvs对应值
let objectMap = new Map();
// let onPort = (ev) => {
//     let data = ev.data;
//     let command = data.command;
//     if (command === 'update') {
//         objectMap.set(data.key, data.value);
//         console.log(`receive a update of `+data.key+':'+data.value);
//     }
// }
let proxyHandler = {
    get: function(target, propKey, receiver) {
        //如果在cvs中,并且已经set就返回objectMap的值
        let key= target.className+'.'+propKey;
        if (objectMap.has(key) ){
            console.log('get value:'+key+':'+objectMap.get(key));
            return objectMap.get(key);
        }
        return target[propKey];
    },
    set: function(target, propKey, newValue, receiver) {
        //console.log('set value');
        target[propKey] = newValue;
        //比如food_flag变成desk.food_flag,因为cvs的是desk.food_flag
        let key= target.className+'.'+propKey;

        for(let workerPort of workerPortsToCvs.keys()) {

            let scvs = workerPortsToCvs.get(workerPort);
            if(scvs.has(key)) {
                workerPort.postMessage({'command': 'update', 'key': key, 'value': newValue});
                
            }
        }
        // if(cvsToWorkerPorts.has(key)){
        //     cvsToWorkerPorts.get(key).forEach((workerPort) => {
        //         workerPort.postMessage({command: 'update', key: key, value: newValue});
        //     });
        // }
        //如果在cvs中，就发送消息
        // if(workerPorts[key]!==undefined){
        //     //更新objectMap的值
        //     objectMap.set(key, newValue);
        //     //发送消息给所有的workerPort
        //     workerPorts[key].forEach((workerPort) => {
        //         workerPort.postMessage({ command: 'update', key: key, value: newValue });
        //     });
        //     console.log('set value'+key+':'+newValue);
        //
        // }

        return true;
    }
}
self.onmessage = (event) => {

    let data = event.data
    let scvs = data.scvs;
    let command = data.command;
    switch (command) {
        case 'start':
            const func = new Function(data.source);
            func();
            break;
        case 'connect':
            let workerPort = event.ports[0];
            workerPortsToCvs.set(workerPort, scvs);

            // 设置消息处理函数，你可以将 onPort 放在这里
            workerPort.onmessage = (ev) => {
                let data = ev.data;
                let command = data.command;
                if (command === 'update') {
                    objectMap.set(data.key, data.value);

                    console.log(`receive a update of ` + data.key + ':' + data.value);
                }
            };
            break;
            //workerPort.onmessage = onPort;

        // case 'update':
        //     console.log('update'+data.key+':'+data.value);
        //     objectMap.set(data.key, data.value);
        default:
            console.log('Received unknown command:', event.data.command);
    }
};
