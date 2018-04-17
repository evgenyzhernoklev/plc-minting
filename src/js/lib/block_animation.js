var BlockAnimations = function() {
  this.window = $(window);
  this.body = $('body');
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
    var startPosition = Math.round($(element).offset().top),
        elementHeight = Math.round($(element).innerHeight()),
        elementPosition = [startPosition, startPosition + elementHeight];

    self.blocksPositions.push(elementPosition);
  });

  // console.log(self.blocksPositions);
};

BlockAnimations.prototype.checkActiveBlock = function () {

};
