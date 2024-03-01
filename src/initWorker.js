

// 一个简单的worker，当接受到{ command: 'start', source }消息时，会执行source中的代码
let workerPort;
let objectMap = new Map();
let onPort = (ev) => {
    let data = ev.data;
    let command = data.command;
    if (command === 'update') {
        objectMap.set(data.key, data.value);
        console.log(`receive a update of key: ${ev.data.key}`);
    }
}
let proxyHandler = {
    get: function(target, propKey, receiver) {
        if (objectMap.has(target.className)) {
            return objectMap.get(target.className)[propKey];
        }
        console.log(`cannot find ${target.className} in objectMap`)
        return target[propKey];
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        console.log('set value');
        if (workerPort) {
            workerPort.postMessage({ command: 'set', key: target.className, value: { ...target } });
        }
        return true;
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
