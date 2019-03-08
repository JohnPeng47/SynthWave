import React from 'react';
import { isReactComponent } from './utils.js'

// collections of methods used to implement the physics engine
export class PhysicsEngine {
    constructor(entities) {
        this.entities = entities;
        this.collisions = [];
    }
    
    initDefaultConfig() {
        return {
            weight : null,
            x : 0,
            y : 0,
            vx : 0,
            vy : 0,
            ax : 0,
            ay : 0,
            dx : 0,
            dy : 0,
            gravity : 1,
            type : "particle",
            // getter methods for positional calculations
            getLeft : () => this.state.x,
            getRight : () => this.state.x + this.state.width,
            getTop : () => this.state.y, // realign coordinate axis so that bottom left corner is (0,0)?
            getBottom : () => this.state.y + this.state.height
        }
    }
    
    setBordersAsEntities() {
        this.entities.push(Object.assign(initDefaultConfig(), { x : 0, type : "leftBorder", y : 0 }));
        this.entities.push(Object.assign(initDefaultConfig(), { y : 0, type : "topBorder", x : 0 }));
        this.entities.push(Object.assign(initDefaultConfig(), { y : 0, type : "topBorder", x : 0 }));
        this.entities.push(Object.assign(initDefaultConfig(), { y : 0, type : "topBorder", x : 0 }));
    }   

    // given 2 rect elements determine if collision occurred
    collisionDetector(a,b) {
        // https://www.ibm.com/developerworks/library/wa-build2dphysicsengine/index.html
        const aLeft = a.getLeft();
        const aRight = a.getRight();
        const aTop = a.getTop();
        const aBottom = a.getBottom();

        const bLeft = b.getLeft();
        const bRight = b.getRight();
        const bTop = b.getTop();
        const bBottom = b.getBottom();    

        if(aLeft > bRight || aRight < bLeft || aTop > bBottom || aBottom < bTop) {
            return false;
        }

        return true;
    }
}