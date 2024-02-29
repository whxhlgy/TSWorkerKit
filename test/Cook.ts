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
        if (objectMap.has(target.className)) {
            return objectMap.get(target.className)[propKey];
        }
        console.log(\`cannot find \${target.className} in objectMap\`)
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
        if (objectMap.has(target.className)) {
            return objectMap.get(target.className)[propKey];
        }
        console.log(\`cannot find \${target.className} in objectMap\`)
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
setTimeout(() => {
    console.log(Desk.food_flag);
}, 1000)
`;
}
const cooker = new Cook(); // Assuming Cook is a subclass of WebWorker
const customer = new Customer(); // Assuming Cook is a subclass of WebWorker
cooker.start();
customer.start();