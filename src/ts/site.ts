// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

import { GameStateManager } from "./GameState/GameStateManager";
// Write your JavaScript code.
var gsm = new GameStateManager(<HTMLCanvasElement>$("#gameCanvas").get(0));

setInterval(() => {
    gsm.update();
    gsm.draw();
}, 10);