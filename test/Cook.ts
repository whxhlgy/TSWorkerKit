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


var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        // TODO: Implement logic if needed
        return target[propKey];
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        //管道发送消息
        if (workerPorts[target.className]) {
            //console.log('set value:');
            workerPorts[target.className].postMessage({ command: 'set', name: target.className, value: { ...target } });
            console.log({ command: 'set', name: target.className, value: { ...target } });
        }
        return true;
    }
});
// TODO()
    console.log('Cooker start!');
    Desk.food_flag = 1;
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

var Desk = new Proxy(__Desk, {
    get: function(target, propKey, receiver) {
        // TODO: Implement logic if needed
        return target[propKey];
    },
    set: function(target, propKey, newValue, receiver) {
        target[propKey] = newValue;
        //管道发送消息
        if (workerPorts[target.className]) {
            //console.log('set value:');
            workerPorts[target.className].postMessage({ command: 'set', name: target.className, value: { ...target } });
            console.log({ command: 'set', name: target.className, value: { ...target } });
        }
        return true;
    }
});
    console.log('Customer start!');
    //while (Desk.food_flag === 0);
    Desk.food_flag = 5;
    console.log(Desk.food_flag);
`;
}
const cooker = new Cook(); // Assuming Cook is a subclass of WebWorker
const customer = new Customer(); // Assuming Cook is a subclass of WebWorker
cooker.start();
customer.start();
