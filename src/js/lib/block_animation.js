var BlockAnimations = function() {
  this.window = $(window);
  this.body = $('body');
  this.menu = $('.menuWrapper');
  this.blocks = $('.js-animation-block');
  this.blocksPositions = [];
  this.init();
};

BlockAnimations.prototype.init = function () {
  var self = this;

  this.collectBlockPositions();
  this.checkActiveBlock();

  this.window.on({
    'scroll': function () {
      self.checkActiveBlock();
    },
    'resize': function () {
      self.blocksPositions = [];
      self.collectBlockPositions();
      self.checkActiveBlock();
    }
  });
};

BlockAnimations.prototype.collectBlockPositions = function () {
  var self = this;

  this.blocks.each(function(index, element) {
    var elementPositionTop = Math.round($(element).offset().top),
        elementHeight = Math.round($(element).innerHeight()),
        startPosition = elementPositionTop - Math.round(self.window.height()),
        endPosition = elementPositionTop + elementHeight,
        elementPosition = [startPosition, endPosition];

    self.blocksPositions.push(elementPosition);
  });

  // console.log(self.blocksPositions);
};

BlockAnimations.prototype.checkActiveBlock = function () {
  var self = this,
      arr = this.blocksPositions,
      currentPosition = this.window.scrollTop() + this.menu.innerHeight();

  arr.forEach(function(item, i, arr) {
    if (currentPosition >= item[0] && currentPosition < item[1]) {
      self.blocks.eq(i).addClass('js-animation-enable');
    }
  });
};
