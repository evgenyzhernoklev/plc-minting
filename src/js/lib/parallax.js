var Parallax = function(element) {
  this.window = $(window);
  this.element = $(element);
  this.denominator = this.element.data('speed');
  this.init();
};

Parallax.prototype.init = function () {
  this.updateParallax();
  this.window.on('scroll', this.updateParallax.bind(this));
};

Parallax.prototype.updateParallax = function () {
  var scrollTop = this.window.scrollTop(),
      position = - scrollTop / this.denominator + 'px';

  this.element.css('transform', 'translateY(' + position + ')');
};
