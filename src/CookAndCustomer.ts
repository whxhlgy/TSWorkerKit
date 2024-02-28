/* Generated from Java with JSweet 4.0.0-SNAPSHOT - http://www.jsweet.org */
import  WebWorker  from './WebWorker';
class CookAndCustomer {
    public static main(args: string[]) {
        const cook: Cook = (() => { let __o : any = new Cook(); __o.__delegate = new Cook(); return __o; })();
        const customer: Customer = (() => { let __o : any = new Customer(); __o.__delegate = new Customer(); return __o; })();
        cook.start();
        customer.start();
    }
}
//CookAndCustomer["__class"] = "CookAndCustomer";


class __Desk {
    public static food_flag: number = 0;

    public static count: number = 10;

    public static lock: any; public static lock_$LI$(): any { if (Desk.lock == null) { Desk.lock = <any>new Object(); }  return Desk.lock; }
}
//Desk["__class"] = "Desk";
var Desk = new Proxy(__Desk, {get: function(target, propKey, receiver) {}})


class Cook extends WebWorker{
    private __captured_cvs : any = {'Thread':Thread,'super':super,'Override':Override,'Desk':Desk,'InterruptedException':InterruptedException,'RuntimeException':RuntimeException,'System':System,}
    public source = `
class __Desk {
    constructor() {
        super();
    }

    public static food_flag: number = 0;

    public static count: number = 10;

    public static lock: any; public static lock_$LI$(): any { if (Cook.lock == null) { Cook.lock = <any>new Object(); }  return Cook.lock; }
}
Desk["__class"] = "Desk";
var Desk = new Proxy(__Desk, {get: function(target, propKey, receiver) {}})
class Cook extends java.lang.Thread {
    private __captured_cvs : any = {'Thread':Thread,'super':super,'Override':Override,'Desk':Desk,'InterruptedException':InterruptedException,'RuntimeException':RuntimeException,'System':System,}    /**
     * 
     */
    public run() {
        while((true)) {{
            {
                if (Desk.count === 0){
                    break;
                } else {
                    if (Desk.food_flag === 1){
                        try {
                            Desk.lock_$LI$().wait();
                        } catch(e) {
                            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                        }
                    } else {
                        console.info("\u53a8\u5e08\u505a\u996d");
                        Desk.food_flag = 1;
                    }
                    Desk.lock_$LI$().notifyAll();
                }
            };
        }};
    }
}
Cook["__class"] = "Cook";
var __entry = new Cook(); __entry.start();
`}

class Customer extends WebWorker{
    private __captured_cvs : any = {'Thread':Thread,'super':super,'Override':Override,'Desk':Desk,'InterruptedException':InterruptedException,'RuntimeException':RuntimeException,'System':System,}
    public source = `
class __Desk {
    constructor() {
        super();
    }

    public static food_flag: number = 0;

    public static count: number = 10;

    public static lock: any; public static lock_$LI$(): any { if (Customer.lock == null) { Customer.lock = <any>new Object(); }  return Customer.lock; }
}
Desk["__class"] = "Desk";
var Desk = new Proxy(__Desk, {get: function(target, propKey, receiver) {}})
class Customer extends java.lang.Thread {
    private __captured_cvs : any = {'Thread':Thread,'super':super,'Override':Override,'Desk':Desk,'InterruptedException':InterruptedException,'RuntimeException':RuntimeException,'System':System,}    /**
     * 
     */
    public run() {
        while((true)) {{
            {
                if (Desk.count === 0){
                    break;
                } else {
                    if (Desk.food_flag === 0){
                        try {
                            Desk.lock_$LI$().wait();
                        } catch(e) {
                            throw Object.defineProperty(new Error(e.message), '__classes', { configurable: true, value: ['java.lang.Throwable','java.lang.Object','java.lang.RuntimeException','java.lang.Exception'] });
                        }
                    } else {
                        console.info("\u5ba2\u4eba\u5403\u996d");
                        Desk.count--;
                        console.info("\u8fd8\u8981\u5403" + Desk.count + "\u7897");
                        Desk.food_flag = 0;
                    }
                    Desk.lock_$LI$().notifyAll();
                }
            };
        }};
    }
}
Customer["__class"] = "Customer";
var __entry = new Customer(); __entry.start();
`}



CookAndCustomer.main(null);
