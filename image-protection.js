/* NEXUS public image-save deterrence. Browser-delivered assets cannot be fully protected. */
(() => {
  'use strict';
  const isEditable = el => Boolean(el && el.closest('input, textarea, [contenteditable="true"], [contenteditable=""], select'));
  // Suppress the standard Save image / Save background image context menus.
  document.addEventListener('contextmenu', event => {
    if (!isEditable(event.target)) event.preventDefault();
  }, {capture:true});
  // Prevent native browser image drag-to-desktop, but not pointer-driven gallery swipe.
  document.addEventListener('dragstart', event => {
    if (event.target.closest('img, picture, svg, canvas')) event.preventDefault();
  }, {capture:true});
  // Images created by the gallery after page load are also covered.
  function protectImages(root) {
    if (root.nodeType === 1 && root.matches('img')) root.draggable = false;
    if (root.querySelectorAll) root.querySelectorAll('img').forEach(img => { img.draggable = false; });
  }
  protectImages(document);
  new MutationObserver(mutations => {
    for (const mutation of mutations) for (const node of mutation.addedNodes) protectImages(node);
  }).observe(document.documentElement, {childList:true,subtree:true});
})();
