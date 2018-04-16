var Tooltips = function() {
  this.content = $('.tooltip-content');
  this.links = $('.tooltip-link');
  this.init();
};

Tooltips.prototype.init = function () {
  var self = this;

  this.links.on('click', this.switchTooltip.bind(this));
  $('body').on('click touchstart', function (e) {
    if (!$(e.target).closest('.tooltip-link').length) {
      self.closeTooltips();
    }
  });
};

Tooltips.prototype.switchTooltip = function (e) {
  e.preventDefault();
  var $target = $(e.target).closest('.tooltip-link');

  if (!$target.hasClass('is-active')) {
    this.closeTooltips();

    $target
      .addClass('is-active')
      .closest('.tooltip-container').find('.tooltip-content')
      .stop().fadeIn();
  } else {
    this.closeTooltips();
  }
};

Tooltips.prototype.closeTooltips = function () {
  this.links.removeClass('is-active');
  this.content.stop().fadeOut();
};
