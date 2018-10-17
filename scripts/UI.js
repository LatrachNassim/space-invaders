function renderUI() {
    context.fillStyle = "#0f0";
    context.font = 'normal 20px "Press start 2P", cursive';
    context.textalign = 'left';
    context.fillText('SCORE: ' + player.score, 20, 40);
    context.textalign = 'right';
    context.fillText('LIVES: ' + player.lives, 300, 40);
    
    context.strokeStyle = '#0f0';
    context.moveTo(20, canvas.height - 40);
    context.lineTo(canvas.width - 20, canvas.height - 40);
    context.stroke();
}