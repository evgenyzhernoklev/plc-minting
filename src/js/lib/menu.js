var Menu = function(container) {
  this.window = $(window);
  this.body = $('body');
  this.container = $(container);
  this.linksMenu = this.container.find('.js-menu-link');
  this.menuHelper = this.container.find('.js-menu-helper');
  this.mobileToggleButton = this.container.find('.js-menu-mobile-toggle');

  this.MENU_HEIGHT = this.container.innerHeight();
  this.MENU_INDENT = this.container.offset().top;
  this.HELPER_WIDTH = this.menuHelper.width();
  this.TABLET_RESOLUTION = 992;

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
      self.checkHelperPosition();
    }
  });
  this.mobileToggleButton.on('click', this.toggleMobileMenu.bind(this));
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
  this.body.removeClass('menu-opened');
};

Menu.prototype.checkMenuPosition = function () {
  var scrollTop = this.window.scrollTop();

  this.container.toggleClass('is-fixed', scrollTop > this.MENU_INDENT);
};

Menu.prototype.checkHelperPosition = function () {
  var $linkActive = this.linksMenu.filter('.is-active'),
      linkPositionLeft = $linkActive.position().left,
      linkPositionTop = $linkActive.position().top,
      linkWidth = $linkActive.innerWidth(),
      linkHeight = $linkActive.innerHeight();

  if (window.viewportSize.getWidth() > this.TABLET_RESOLUTION) {
    this.menuHelper.css({
      'left': linkPositionLeft + linkWidth / 2 - this.HELPER_WIDTH / 2,
      'top': 'auto'
    });
  } else {
    this.menuHelper.css({
      'left': '50%',
      'top': linkPositionTop + linkHeight - 3
    });
  }
};

Menu.prototype.toggleMobileMenu = function (e) {
  e.preventDefault();
  this.body.toggleClass('menu-opened');
};
