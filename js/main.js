  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 
  1, 2, 3, 4, 5, 6, 7, 8];
  

  let circle1;
  let circle2;
  let matchFound = 0;
  let disable = false;
  let counter;
  let seconds = 60;


  const circles = document.querySelectorAll('.circle');
  const messages = document.querySelector('.message');
  const times = document.querySelector('.time');
  

  circles.forEach(circle => {
    circle.addEventListener('click', circleFlip);
  });


  function gameRestart() {
    matchFound = 0;
    disable = false;
    seconds = 60;
    circle1 = circle2 = '';

    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    circles.forEach((circle, i) => {
      circle.classList.remove('flip');
      let imgs = circle.querySelector('.back img');
      imgs.src = `images/img-${arr[i]}.webp`;
      circle.addEventListener('click', circleFlip);
    });
  }

  function startTimer() {
    counter = setInterval(timer, 1000);

    function timer() {
      times.innerHTML = '01:00';

      if(seconds < 60 && seconds >= 10) {
        times.innerHTML = '00' + `:${seconds}`;
      }

      if(seconds <= 9) {
        times.innerHTML = '00' + `:${'0' + seconds}`;
      }

      if(seconds > 0) {
        seconds--;
      } else {
        messages.style.visibility = 'visible';
        messages.innerText = "YOU LOSE...";

        return setTimeout(() => {
          gameRestart();
          messages.style.visibility = 'hidden';
        }, 1800);
      }
    }
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

    if(matchFound === 8 && seconds > 0) {
      messages.style.visibility = 'visible';
      messages.innerText = "YOU WIN!!!";
        
      return setTimeout(() => {
        gameRestart();
        messages.style.visibility = 'hidden';
      }, 1800);
    }
    
    circle1.classList.add('flip');
    circle2.classList.add('flip');
    circle1 = circle2 = '';

    return setTimeout(() => {
      messages.style.visibility = 'hidden';
    });
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


  gameRestart();
  startTimer();