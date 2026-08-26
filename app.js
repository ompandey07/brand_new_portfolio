/* ================================================
   DISABLE RIGHT CLICK CONTEXT MENU
   ================================================ */
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});


/* ================================================
   DISABLE COMMON DEVELOPER SHORTCUT KEYS
   F12 | CTRL+SHIFT+I | CTRL+SHIFT+J | CTRL+SHIFT+C | CTRL+U
   ================================================ */
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
    return false;
  }
});
