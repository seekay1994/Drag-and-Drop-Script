'use strict';

export var scriptProperties = createScriptProperties()
    .addCheckbox({
        name: 'isMovable',
        label: 'Is movable',
        value: false
    })
    .finish();

const storageName = "storedPos";
let isDragging = false;
let dragOffset;

export function cursorDown(event) {
    isDragging = true;
    dragOffset = thisLayer.origin.subtract(event.worldPosition);
}

export function cursorUp(event) {
    isDragging = false;
    localStorage.set(storageName, thisLayer.origin);
}

export function cursorMove(event) {
    if (isDragging && scriptProperties.isMovable) {
        thisLayer.origin = event.worldPosition.add(dragOffset);
    }
}

export function init() {
    return localStorage.get(storageName) || thisLayer.origin;
} 