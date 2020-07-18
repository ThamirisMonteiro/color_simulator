window.addEventListener('load', start);
var rgb = 'background-color: rgb(';
var square = document.querySelector('.square');
var selectorInputs = '.value';
var selectorRanges = '.input';
var ranges,
  inputs,
  attribute = null;
var colors = {};
var reset = document.querySelector('#reset');
var random = document.querySelector('#random');
inputs = getElements(selectorInputs);

function start() {
  function preventFormSubmit() {
    function handleFormSubmit(event) {
      event.preventDefault();
    }
    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);
  }
  preventFormSubmit();
  ranges = getElements(selectorRanges);
  function addListener(ranges) {
    for (var i = 0; i < ranges.length; i++) {
      ranges[i].addEventListener('input', setSquare);
    }
  }
  attribute = rgb;
  setSquare();
  addListener(ranges);
  reset.addEventListener('click', resetAll);
  random.addEventListener('click', randomize);
}

function resetAll() {
  var zeroed = ['0', '0', '0'];
  square.setAttribute(
    'style',
    'background-color: rgb(' +
      zeroed[0] +
      ',' +
      zeroed[1] +
      ',' +
      zeroed[2] +
      ')'
  );
  ranges[0].value = zeroed[0];
  ranges[1].value = zeroed[1];
  ranges[2].value = zeroed[2];
  inputs[0].value = zeroed[0];
  inputs[1].value = zeroed[1];
  inputs[2].value = zeroed[2];
}

function setSquare() {
  square.setAttribute('style', returnRgbFunction(ranges));
  attribute = rgb;
  updateInputs(inputs, ranges);
}

function getElements(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function returnRgbFunction(ranges) {
  for (var i = 0; i < ranges.length; i++) {
    attribute += ranges[i].value + ',';
  }
  return attribute.substring(0, attribute.length - 1) + ')';
}

function randomize() {
  var max = 255;
  var min = 0;
  for (var i = 0; i < ranges.length; i++) {
    colors[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  square.setAttribute(
    'style',
    (attribute += colors[0] + ',' + colors[1] + ',' + colors[2])
  );
  ranges[0].value = colors[0];
  ranges[1].value = colors[1];
  ranges[2].value = colors[2];
  inputs[0].value = ranges[0].value;
  inputs[1].value = ranges[1].value;
  inputs[2].value = ranges[2].value;
  attribute = rgb;
}

function updateInputs(inputs, ranges) {
  for (var i = 0; i < ranges.length; i++) {
    inputs[i].value = ranges[i].value;
  }
}

function updateRanges(inputs, ranges) {
  for (var i = 0; i < ranges.length; i++) {
    ranges[i].value = inputs[i].value;
  }
}
