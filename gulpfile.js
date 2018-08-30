const gulp = require('gulp')
const xmlJsConverter = require('xml-js-converter');

const elixir = require('laravel-elixir');

elixir((mix) => {
    mix.webpack('app.js', './assets/js/app.js');
    mix.scripts(['script.js', 'upload.js'], './assets/js/script.js');

    mix.sass('app.scss', './assets/css/app.css');
    mix.sass('primer-tooltips.scss', './assets/css/primer-tooltips.css');
});