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
  var self = this,
      windowHeight = this.window.height();

  this.blocks.each(function(index, element) {
    var elementPositionTop = Math.round($(element).offset().top),
        elementHeight = Math.round($(element).innerHeight()),
        startPosition = elementPositionTop - windowHeight,
        endPosition = elementPositionTop + elementHeight,
        elementPosition = [startPosition, endPosition];

    self.blocksPositions.push(elementPosition);
  });
};

BlockAnimations.prototype.checkActiveBlock = function () {
  var self = this,
      arr = this.blocksPositions,
      currentPosition = this.window.scrollTop() + this.menu.innerHeight();

  arr.forEach(function(item, i, arr) {
    if (currentPosition >= item[0] && currentPosition < item[1]) {
      var $activeBlock = self.blocks.eq(i),
          animation = $activeBlock.data('animation');

      if (animation == 'chart-map' && !$activeBlock.hasClass('js-animation-enable')) {
        $('.' + animation).easyPieChart({
          barColor: '#169feb',
          trackColor: '#ebebeb',
          scaleLength: 0,
          lineCap: 'butt',
          lineWidth: 8,
          size: 70,
          animate: {
            duration: 2000,
            enabled: true
          },
          onStep: function(from, to, percent) {
            $(this.el).find('.mapChart__info').text(percent.toFixed(1));
          }
        });
      }

      $activeBlock.addClass('js-animation-enable');
    }
  });
};
