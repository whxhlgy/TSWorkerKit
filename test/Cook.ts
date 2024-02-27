import WebWorker from "../src/WebWorker";

export class Cook extends WebWorker {

    __captured_cvs = { 'Desk': 'Desk' }
    // Class definition
    source =`
// Worker thread JavaScript code
console.log('Cooker start!');
class __Desk {
    public static food_flag: number = 0;

    public static count: number = 10;
}

let workerPort: MessagePort;
self.onmessage = ev => {
    if (ev.data.command === 'connect') {
        workerPort = ev.ports[0];
        console.log('connected!');
    }
};
var Desk = new Proxy(__Desk,
    {
        get: function(target, propKey, receiver) {
            // TODO
        },
        set(target, p, newValue, receiver): boolean {
            target[p as keyof typeof target] = newValue
            workerPort.postMessage({ command: 'set', key: target, value: {...target, p: newValue }})            
            return true;
        }
    }
);
console.log('Cooker start!');
Desk.food_flag = 1
`;
}

console.log(1);
const worker = new Cook(); // Assuming Cook is a subclass of WebWorker
worker.start();