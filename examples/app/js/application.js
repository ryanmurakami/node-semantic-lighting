var $form = $('form');

$form.on('submit', function (e) {
  e.preventDefault();
  e.stopPropagation();

  queryDatForm();
});

$form.find('.button').click(function () {
  queryDatForm();
});

registerSpeech();

function queryDatForm() {
  var query = $form.find('#query').val();

  if (query) {
    $form.find('#query').val('').blur();
    queryDat(query);
  } 
}

function queryDat(query) {
  $.post('/light', {
    query: query,
    lights: ['living room', 'bedroom']
  }, function (data) {
    showDemColors(data.colors);
  });
}

function showDemColors(colors) {
  var $lightMaster = $('#lights').empty();

  for(var ix in colors) {
    $lightMaster.append('<div class="light" style="background-color:' + colors[ix] + '"></div>');
  }
}

function registerSpeech () {
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'show me *tag': function(tag) {
        queryDat(tag);
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
}