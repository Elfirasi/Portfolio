function animateWithRandomNumber(element, from, to) {
    const duration = Math.floor(Math.random() * 20000 + 1000); // Random duration between 1s and 3s
  
    let startTime = null;
  
    function animate(currentTime) {
      if (!startTime) {
        startTime = currentTime;
      }
  
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
  
      const newY = from + (to - from) * progress;
      element.style.transform = `translateY(${newY}px)`;
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation completed, reset for next animation
        startTime = null;
        animateWithRandomNumber(element, from, to);
      }
    }
  
    requestAnimationFrame(animate);
  }
  
  const itemsDown = [
    ".light4", ".light5", ".light6", ".light7", ".light8", ".light11", ".light12", ".light13", ".light14", ".light15", ".light16"
  ];
  
  const itemsUp = [
    ".light1", ".light2", ".light3", ".light9", ".light10", ".light17"
  ];
  
  itemsDown.forEach((element) => {
    animateWithRandomNumber(document.querySelector(element), -1080, 1080);
  });
  
  itemsUp.forEach((element) => {
    animateWithRandomNumber(document.querySelector(element), 1080, -1080);
  });


  var Text = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  Text.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-words');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new Text(elements[i], JSON.parse(toRotate), period);
      }
    }
  };