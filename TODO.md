# TODO

## 1. class WebWorker
设计WebWorker类，使用如下方法，将类里的source作为webworker代码
```js
const code = "console.log('Hello from web worker!')"
const blob = new Blob([code], {type: 'application/javascript'})
const worker = new Worker(URL.createObjectURL(blob))
```
WebWorker类型如下
```js
class Webworker {
    public start();
}
```
在start方法中创建worker进程