import WebWorker from "../src/WebWorker";

export class Cook extends WebWorker {
    // Class definition
    cvs: any = {'Desk2': 'Desk2', 'Desk': 'Desk', 'Desk1': 'Desk1'};
    source =`
// Worker thread JavaScript code
class __Desk {
    static food_flag = 0;
    static count = 10;
    static className = 'Desk';
}

let workerPorts = {};

self.onmessage = ev => {
    if (ev.data.command === 'connect') {
        //workerPort = ev.ports[0];
        let name = ev.data.name;
        workerPorts[name] = ev.ports[0];
        console.log('connected:'+name);
    }
    if (ev.data.command === 'update') {
        console.log('update:'+ev.data.name);
        console.log(ev.data.value);
        // 遍历更新数据中的属性
        for (let prop in ev.data.value) {
            if (ev.data.value.hasOwnProperty(prop)) {
                // 如果属性存在于 __Desk 类中，则更新它
                if (__Desk.hasOwnProperty(prop)) {
                    __Desk[prop] = ev.data.value[prop];
                }
            }
        }     
    }
}


var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        // TODO: Implement logic if needed
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        //管道发送消息
        if (workerPorts[target.className]) {
            console.log('set value:');
            workerPorts[target.className].postMessage({ command: 'set', name: target.className, value: { ...target } });
            console.log({ command: 'set', name: target.className, value: { ...target } });
        }
        return true;
    }
});
console.log('Cooker start!');
// 怎么让Worker在main thread 运行好之前，不要执行set和get操作
// TODO()
setTimeout(() => {
    Desk.food_flag = 1;
    //Desk.count=9;
}, 2000);
`;
}

export class Customer extends WebWorker {
    cvs: any = {'Desk2': 'Desk2', 'Desk': 'Desk', 'Desk1': 'Desk1'};
    // Class definition
    source =`
// Worker thread JavaScript code
class __Desk {
    static food_flag = 0;
    static count = 10;
    static className = 'Desk';
}
let workerPorts = {};

self.onmessage = ev => {
    if (ev.data.command === 'connect') {
        //workerPort = ev.ports[0];
        let name = ev.data.name;
        workerPorts[name] = ev.ports[0];
        console.log('connected:'+name);
    }
    if (ev.data.command === 'update') {
        console.log('update:'+ev.data.name);
        console.log(ev.data.value);
        // 遍历更新数据中的属性
        for (let prop in ev.data.value) {
            if (ev.data.value.hasOwnProperty(prop)) {
                // 如果属性存在于 __Desk 类中，则更新它
                if (__Desk.hasOwnProperty(prop)) {
                    __Desk[prop] = ev.data.value[prop];
                }
            }
        }     
    }
}


var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        // TODO: Implement logic if needed
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        //管道发送消息
        if (workerPorts[target.className]) {
            console.log('set value:');
            workerPorts[target.className].postMessage({ command: 'set', name: target.className, value: { ...target } });
            console.log({ command: 'set', name: target.className, value: { ...target } });
        }
        return true;
    }
});
setTimeout(() => {
    Desk.food_flag = 0;
    Desk.count=9;
}, 2000);
`;
}
const cooker = new Cook(); // Assuming Cook is a subclass of WebWorker
const customer = new Customer(); // Assuming Cook is a subclass of WebWorker
cooker.start();
customer.start();
