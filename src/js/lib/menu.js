var Menu = function(container) {
  this.window = $(window);
  this.body = $('body');
  this.container = $(container);
  this.linksMenu = this.container.find('.js-menu-link');
  this.menuHelper = this.container.find('.js-menu-helper');
  this.mobileToggleButton = this.container.find('.js-menu-mobile-toggle');
  this.blocksMenu = $('.js-menu-scroll-content');
  this.blocksMenuPositions = [];
  this.isLinkScroll = false;

  this.MENU_HEIGHT = this.container.innerHeight();
  this.HELPER_WIDTH = this.menuHelper.width();
  this.TABLET_RESOLUTION = 992;

  this.init();
};

Menu.prototype.init = function () {
  var self = this;

  this.collectBlockPositions();
  this.checkMenuPosition();
  this.checkHelperPosition();

  this.container.on('click', '.js-menu-link', this.scrollToContent.bind(this));
  this.window.on({
    'scroll': function () {
      self.checkMenuPosition();
      if (!self.isLinkScroll) {
        self.checkActiveLinkMenu();
      }
    },
    'resize': function () {
      self.blocksMenuPositions = [];
      self.collectBlockPositions();
      self.checkActiveLinkMenu();
    }
  });
  this.mobileToggleButton.on('click', this.toggleMobileMenu.bind(this));
};

Menu.prototype.scrollToContent = function (e) {
  e.preventDefault();
  var self = this,
      $target = $(e.target),
      elementToScroll = $target.attr('href'),
      elementPositionTop = $(elementToScroll).offset().top,
      elementPositionToScroll = elementPositionTop - this.MENU_HEIGHT;

  this.isLinkScroll = true;
  this.linksMenu.removeClass('is-active');
  $target.addClass('is-active');
  this.checkHelperPosition();
  $('body, html').animate({
    scrollTop: elementPositionToScroll + 1
  }, 700, function () {
    self.isLinkScroll = false;
  });
  this.body.removeClass('menu-opened');
};

Menu.prototype.checkMenuPosition = function () {
  var scrollTop = this.window.scrollTop(),
      indent = window.viewportSize.getWidth() > this.TABLET_RESOLUTION ? 30 : 0;

  this.container.toggleClass('is-fixed', scrollTop > indent);
};

Menu.prototype.checkHelperPosition = function () {
  var $linkActive = this.linksMenu.filter('.is-active');

  if (!$linkActive.length) {return;}

  var linkWidth = $linkActive.innerWidth(),
      linkHeight = this.linksMenu.innerHeight(),
      linkPositionLeft = $linkActive.position().left,
      linkPositionTop = $linkActive.position().top;

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

Menu.prototype.collectBlockPositions = function () {
  var self = this;

  this.blocksMenu.each(function(index, element) {
    var topPosition = $(element).offset().top,
        elementHeight = $(element).innerHeight(),
        elementPosition = [topPosition, topPosition + elementHeight];

    self.blocksMenuPositions.push(elementPosition);
  });
};

Menu.prototype.checkActiveLinkMenu = function () {
  var self = this,
      arr = this.blocksMenuPositions,
      currentPosition = this.window.scrollTop() + this.MENU_HEIGHT;

  self.linksMenu.removeClass('is-active');
  arr.forEach(function(item, i, arr) {
    if (currentPosition >= item[0] && currentPosition < item[1]) {
      self.linksMenu.eq(i).addClass('is-active');
    }
  });
  this.checkHelperPosition();
};
