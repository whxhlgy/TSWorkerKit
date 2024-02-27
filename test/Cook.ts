import WebWorker from "../src/WebWorker";

export class Cook extends WebWorker {

    __captured_cvs = { 'Desk': 'Desk' }
    // Class definition
    source =`
// Worker thread JavaScript code
class __Desk {
    static food_flag = 0;
    static count = 10;
    static className = 'Desk';
}
let workerPort;
self.onmessage = ev => {
    if (ev.data.command === 'connect') {
        workerPort = ev.ports[0];
        console.log('connected!');
    }
};

var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        // TODO: Implement logic if needed
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        console.log('set value');
        if (workerPort) {
            workerPort.postMessage({ command: 'set', key: target.className, value: { ...target } });
        }
        return true;
    }
});
console.log('Cooker start!');
// 怎么让Worker在main thread 运行好之前，不要执行set和get操作
// TODO()
setTimeout(() => {
    Desk.food_flag = 1;
}, 2000);
`;
}

console.log(1);
const worker = new Cook(); // Assuming Cook is a subclass of WebWorker
worker.start();