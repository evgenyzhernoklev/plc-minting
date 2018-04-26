var Viewer = function() {
  this.window = $(window);
  this.body = $('body');
  this.fullHeightElements = $('.js-full-height');
  this.scrollLinks = $('.js-scroll-link');
  this.menu = $('.js-menu-container');
  this.init();
};

Viewer.prototype.init = function () {
  this.initClasses();
  this.initFunctions();
  this.window.on('resize', this.updateResizer.bind(this));
  this.scrollLinks.on('click', this.scrollToBlock.bind(this));
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
  this.fullWindowHeight();
};

Viewer.prototype.updateResizer = function () {
  this.fullWindowHeight();
};

Viewer.prototype.fullWindowHeight = function () {
  var newHeight = this.window.height();

  this.fullHeightElements.height(newHeight);
};

Viewer.prototype.scrollToBlock = function (e) {
  e.preventDefault();
  var target = $(e.target).closest('.js-scroll-link').attr('href'),
      targetPositionTop = $(target).offset().top - this.menu.height() * 1.5;

  $('body, html').animate({
    scrollTop: targetPositionTop
  }, 700);
};
