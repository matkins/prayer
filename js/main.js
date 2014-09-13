var currentDate = new Date();
currentDate.setHours(12);

var currentPsalm = 1;

function psalm(date){
  var days = Math.floor((date - new Date(2010,6,31,12)) / (1000*60*60*24));
  return (days % 150) + 1;
}

function lordsPrayer(date){
  days = [
  'Our Father in heaven,<br>hallowed be your name,',
  'your kingdom come,<br>your will be done,<br>on earth as in heaven.',
  'Give us today our daily bread.',
  'Forgive us our sins<br>as we forgive those who sin against us.',
  'Lead us not into temptation<br>but deliver us from evil.',
  'For the kingdom, the power,<br>and the glory are yours<br>now and for ever.'
  ]
  var weekday = moment(date).weekday();
  if(weekday == 0){
    return days.join('<br>') + '<br>Amen';
  } else {
    var dayString = days[weekday - 1];
    return dayString.substring(0,1).toUpperCase() + dayString.substring(1);
  }
}

function renderSchedule(){
  $('#date').html(moment(currentDate).format('dddd Do MMMM'));
  currentPsalm = psalm(currentDate);
  var url = 'https://www.bible.com/bible/111/psa.' + currentPsalm + '.niv';
  $('#morning').html('<a href="'+url+'" class="psalm">Psalm ' + currentPsalm + '</a>');
  $('#noon').html(lordsPrayer(currentDate));
}

$(document).ready(function(){
  renderSchedule();
  $('a.prev').click(function(e){
    e.preventDefault();
    currentDate = moment(currentDate).subtract(1, 'day');
    renderSchedule();
  });
  $('a.next').click(function(e){
    e.preventDefault();
    currentDate = moment(currentDate).add(1, 'day');
    renderSchedule();
  });
  if(/(iPad|iPhone|iPod)/g.test( navigator.userAgent )){
    $('#morning').on('click', 'a.psalm', function(e){
      e.preventDefault();
      var url = this.href;
      setTimeout(function () { window.location = url; }, 100);
      window.location = "youversion://bible?reference=Ps." + currentPsalm;
    });
  }
});