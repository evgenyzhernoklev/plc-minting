var Menu = function(container) {
  this.window = $(window);
  this.body = $('body');
  this.container = $(container);
  this.linksMenu = this.container.find('.js-menu-link');
  this.menuHelper = this.container.find('.js-menu-helper');

  this.MENU_HEIGHT = this.container.innerHeight();
  this.MENU_INDENT = this.container.offset().top;
  this.HELPER_WIDTH = this.menuHelper.width();

  this.init();
};

Menu.prototype.init = function () {
  var self = this;

  this.checkMenuPosition();
  this.checkHelperPosition();

  this.container.on('click', '.js-menu-link', this.scrollToContent.bind(this));
  this.window.on({
    'scroll': function () {
      self.checkMenuPosition();
    },
    'resize': function () {

    }
  });
};

Menu.prototype.scrollToContent = function (e) {
  e.preventDefault();
  var $target = $(e.target),
      elementToScroll = $target.attr('href'),
      elementPositionTop = $(elementToScroll).offset().top,
      elementPositionToScroll = elementPositionTop - this.MENU_HEIGHT;

  this.linksMenu.removeClass('is-active');
  $target.addClass('is-active');
  this.checkHelperPosition();
  $('body, html').animate({
    scrollTop: elementPositionToScroll
  }, 700);
};

Menu.prototype.checkMenuPosition = function () {
  var scrollTop = this.window.scrollTop();

  this.container.toggleClass('is-fixed', scrollTop > this.MENU_INDENT);
};

Menu.prototype.checkHelperPosition = function () {
  var $linkActive = this.linksMenu.filter('.is-active'),
      linkPositionLeft = $linkActive.position().left,
      linkWidth = $linkActive.innerWidth();

  this.menuHelper.css('left', linkPositionLeft + linkWidth / 2 - this.HELPER_WIDTH / 2);
};
