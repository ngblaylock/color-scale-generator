import { writable } from 'svelte/store';

export const background = writable('#eeeeee');
export const mode = writable('HEX');
export const colorNum = writable(10)
