 /*
 * Jquery Terminal Plugin
 * Copyright (c) 2015 Theodor F Purcaru, BlueBit
 * Version 0.1
 * Open Source FTW
 * Be a cool person, if you use this for some awesome projects, gimme a link, I wantz to see
 * o7
 */

 var _user = "";
        var _logged = false;
        var $output;
        var _inited = false;
        var _locked = false;
        var _buffer = [];
        var _obuffer = [];
        var _ibuffer = [];
        var _cwd = "/";
        var _prompt = function() { return _cwd + " $ "; };
        var _history = [];
        var _hindex = -1;
        var _lhindex = -1;


 jQuery(function($) {
    $.terminal = function(_commands, afterLoad,_powerMessage) {

        var _commands = _commands;
        var afterLoad = afterLoad;
        var _powerMessage = _powerMessage;
        var _powered = true;
        /*
        var extras = jQuery.extend({
            _commands: {},
            afterLoad : function() { $.print("Initializing ShreckNET\n");  $.print("Use `login <name>` to connect ");   $.print("\n\n" + _prompt());}
        }, extras);
        */
        

        /////////////////////////////////////////////////////////////////
        // UTILS
        /////////////////////////////////////////////////////////////////

        
        window.requestAnimFrame = (function(){
          return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
        })();

        /////////////////////////////////////////////////////////////////
        // SHELL
        /////////////////////////////////////////////////////////////////

        (function animloop(){
          requestAnimFrame(animloop);

          if ( _obuffer.length ) {
            $output.value += _obuffer.shift();
            _locked = true;

            $.update();
          } else {
            if ( _ibuffer.length ) {
              $output.value += _ibuffer.shift();

              $.update();
            }

            _locked = false;
            _inited = true;
          }
        })();

        

        function clear() {
          $output.value = '';
          _ibuffer = [];
          _obuffer = [];
          $.print("");
        }

        function command(cmd) {
          $.print("\n");
          if ( cmd.length ) {
            var a = cmd.split(' ');
            var c = a.shift();
            if ( c in _commands ) {
              var result = _commands[c].apply(_commands, a);
              if ( result === false ) {
                clear();
              } else {
                $.print(result || "\n", true);
              }
            } else {
              $.print("Unknown command: " + c);
            }

            _history.push(cmd);
          }
          $.print("\n\n" + _prompt());

          _hindex = -1;

          
        }

        function changePower() {
          console.log('power');
          
          var effect = document.getElementById('effect');
          effect.play();
          if(_powered) {
              var song = document.getElementById('song');
              song.pause();
              var element = document.getElementById("output");
              element.value = "";
              _user = "";
              _logged = false;
              $.print(_powerMessage + _prompt(),true);
              $("#closed").css('opacity',1);
              $('#leds').css('opacity',0);
              $('#closed-leds').css('opacity',1);
              _powered = false;
          } else {
              $('#closed').css('opacity',0);
              $('#leds').css('opacity',1);
              $('#closed-leds').css('opacity',0);
              _powered = true;
          }
        }

        function nextHistory() {
          if ( !_history.length ) return;

          var insert;
          if ( _hindex == -1 ) {
            _hindex  = _history.length - 1;
            _lhindex = -1;
            insert   = _history[_hindex];
          } else {
            if ( _hindex > 1 ) {
              _lhindex = _hindex;
              _hindex--;
              insert = _history[_hindex];
            }
          }

          if ( insert ) {
            if ( _lhindex != -1 ) {
              var txt = _history[_lhindex];
              $output.value = $output.value.substr(0, $output.value.length - txt.length);
              $.update();
            }
            _buffer = insert.split('');
            _ibuffer = insert.split('');
          }
        }

        window.onload = function() {
          $output = document.getElementById("output");
          $output.contentEditable = true;
          $output.spellcheck = false;
          $output.value = '';

          $output.onkeydown = function(ev) {
            var k = ev.which || ev.keyCode;
            var cancel = false;

            if ( !_inited ) {
              cancel = true;
            } else {
              if ( k == 9 ) {
                cancel = true;
              } else if ( k == 38 ) {
                nextHistory();
                cancel = true;
              } else if ( k == 40 ) {
                cancel = true;
              } else if ( k == 37 || k == 39 ) {
                cancel = true;
              }
            }

            if ( cancel ) {
              ev.preventDefault();
              ev.stopPropagation();
              return false;
            }

            if ( k == 8 ) {
              if ( _buffer.length ) {
                _buffer.pop();
              } else {
                ev.preventDefault();
                return false;
              }
            }

            return true;
          };

          $output.onkeypress = function(ev) {
            ev.preventDefault();
            if ( !_inited ) {
              return false;
            }

            var k = ev.which || ev.keyCode;
            if ( k == 13 ) {
              var cmd = _buffer.join('').replace(/\s+/, ' ');
              _buffer = [];
              command(cmd);
            } else {
              if ( !_locked ) {
                var kc = String.fromCharCode(k);
                _buffer.push(kc);
                _ibuffer.push(kc);
              }
            }

            return true;
          };

          $output.onfocus = function() {
            $.update();
          };

          $output.onblur = function() {
            $.update();
          };

          window.onfocus = function() {
            $.update();
          };

          var _firstMessage = afterLoad();

          $('#power-btn').click(changePower);

          $.print(_firstMessage);
          $.print(_prompt());
        };
    };
    $.print = function (input, lp) {
          $.update();
          _obuffer = _obuffer.concat(lp ? [input] : input.split(''));
    };
    $.update = function () {
          $output.focus();
          var l = $output.value.length;
          setSelectionRange($output, l, l);
          $output.scrollTop = $output.scrollHeight;

          function setSelectionRange(input, selectionStart, selectionEnd) {
          if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
          }
          else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
          }
        }
    };
    $.display = function(param) {
        $("#img-holder").html('<img src="img/'+param+'">');
        $('#img-holder').addClass('visible');
    };

    $.hide = function() {
        $('#img-holder').removeClass('visible');
    };
 });
