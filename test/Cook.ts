import WebWorker from "../src/WebWorker";

export class Cook extends WebWorker {
    __captured_cvs = { 'Desk': 'Desk' }
    // Class definition
    source =`

    // Worker thread JavaScript code
    console.log('Cooker start!');
     ;`;
}
