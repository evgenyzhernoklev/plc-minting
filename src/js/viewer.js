var Viewer = function() {
  this.window = $(window);
  this.body = $('body');
  this.init();
};

Viewer.prototype.init = function () {
  this.initClasses();
  this.initFunctions();
  this.window.on('resize', this.updateResizer.bind(this));
};

Viewer.prototype.initClasses = function () {
  $('.dropdown-container').each(function() {
    new DropdownFooter(this);
  });
  new Menu('.js-menu-container');
  new Tooltips();
  new BlockAnimations();
};

Viewer.prototype.initFunctions = function () {
  $(window).enllax();
};

Viewer.prototype.updateResizer = function () {

};
