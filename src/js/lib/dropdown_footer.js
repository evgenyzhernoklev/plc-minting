var DropdownFooter = function(container) {
  this.window = $(window);
  this.container = $(container);
  this.content = this.container.find('.dropdown-content');
  this.links = this.container.find('.dropdown-link');
  this.MOBILE_RESOLUTION = 767;

  this.init();
};

DropdownFooter.prototype.init = function () {
  this.links.on('click', this.toggleDropdown.bind(this));
  this.window.on('resize', this.checkDropdown.bind(this));
};

DropdownFooter.prototype.toggleDropdown = function (e) {
  e.preventDefault();
  var $target = $(e.target);

  if (window.viewportSize.getWidth() <= this.MOBILE_RESOLUTION) {
    $target.toggleClass('is-active');
    this.content.stop().slideToggle();
  }
};

DropdownFooter.prototype.checkDropdown = function () {
  if (window.viewportSize.getWidth() > this.MOBILE_RESOLUTION) {
    this.links.removeClass('is-active');
    this.content.stop().slideDown();
  }
};
