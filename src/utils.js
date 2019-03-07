export function convertPXtoNum(px) {
    return parseFloat(px.slice(0, px.indexOf("px")))
}

// export class EventHandler{
//     constructor(){
//         super.constructor();
//         this.eventHandlers = {};
//         this.onEvent = this.onEvent.bind(this);
//     }

//     onEvent(event){
//         const eventType = event.type;
//         Object.entries(this.eventHandlers).forEach( handler => {
//             const type = handler[0];
//             const cb = handler[1];
//             if(type == eventType) {
//                 cb(event);
//             }
//         })
//     }

//     registerHandler()
    
// }