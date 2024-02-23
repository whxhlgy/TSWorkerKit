import WebWorker from "../src/WebWorker";

export class Cook extends WebWorker {
    // Class definition
    source =`

    // Worker thread JavaScript code
    console.log('Cooker start!');
    
    self.onmessage = (event) => {
      console.log('Message received in worker:', event.data);
      // Process the message and respond
      self.postMessage('Work done by Cook');
    }; ` ;
}
