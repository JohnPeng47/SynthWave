import React from 'react';
import { isReactComponent } from './utils.js'

// collections of methods used to implement the physics engine
export class PhysicsEngine {
    constructor(entities) {
        this.entities = entities;
        this.collisions = [];
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