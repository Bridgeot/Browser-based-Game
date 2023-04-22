  let circle1;
  let circle2;
  let matchFound = 0;
  let deactivate = false;


  const circles = document.querySelectorAll('.circle');
  const messages = document.querySelector('.message');
  

  circles.forEach(circle => {
    circle.addEventListener('click', circleFlip);
  });


  function playAgain() {
    circles.forEach(circle => {
      circle.classList.remove('flip');
    });

    circle1 = circle2 = '';
    matchFound = 0;
    deactivate = false;
  }

  function circleFlip() {
    if(this !== circle1) {
      this.classList.add('flip');

    if(!circle1) {
      return circle1 = this;
    }
    circle2 = this;

    let pic1 = circle1.querySelector('.back img').src;
    let pic2 = circle2.querySelector('.back img').src;
    circleMatch(pic1, pic2);

    }
  }

  function circleMatch(pic1, pic2) {
    if(pic1 === pic2) {
      matchFound++;

      if(matchFound === 8) {
        messages.style.visibility = 'visible';
        messages.innerText = "YOU WIN!!!";

        return setTimeout(() => {
          playAgain();
          messages.style.visibility = 'hidden';
        }, 1400);
      }

      circle1.classList.add('flip');
      circle2.classList.add('flip');
      circle1 = circle2 = '';

      return setTimeout(() => {
        messages.style.visibility = 'hidden';
      }, 600);
    }
    
    messages.style.visibility = 'visible';
    messages.innerText = "TRY AGAIN";

    setTimeout(() => {
      circle1.classList.remove('flip');
      circle2.classList.remove('flip');
      circle1 = circle2 = '';
      messages.style.visibility = 'hidden';
    }, 800);

  }

  playAgain();