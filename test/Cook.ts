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
var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        if (workerPort) {
            
            workerPort.postMessage({ command: 'get', key: target.className});
            //
            if(objectMap.has("target"))
                return (objectMap.get("target"))[propKey];
            else
                return target[propKey];
            
        }
        
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
Desk.food_flag = 1;
`;
}
export class Customer extends WebWorker {

    __captured_cvs = { 'Desk': 'Desk' }
    // Class definition
    source =`
// Worker thread JavaScript code
class __Desk {
    static food_flag = 0;
    static count = 10;
    static className = 'Desk';
}
var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        workerPort.postMessage({ command: 'get', key: target.className});
            //
        if(objectMap.has("target"))
            return (objectMap.get("target"))[propKey];
        else
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
});
console.log('Customer start!');
while (Desk.food_flag === 0);
console.log(Desk.food_flag);
`;
}
const cooker = new Cook(); // Assuming Cook is a subclass of WebWorker
const customer = new Customer(); // Assuming Cook is a subclass of WebWorker
cooker.start();
customer.start();