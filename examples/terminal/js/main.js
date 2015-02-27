
 var _timeOut = 1000;
 var _logged = false
 var _user = "";
 var _connectionUrl = 'http://localhost/terminal/';
 var _songs = ['menu','isolated'];
 var _networks = [];
 var _curNetwork = [];
 var _nodes = []; // get from network in which user enters
 var _curNode = [];
 var _characters = [] // put the node being used once connected, overwrite whenever a new node is used
 var _curCharacter = [];
 var _curImage = "";
 var _autoplay = "true";
$(document).ready(function () {

  var _audio = document.getElementById('song');
  var _$audio = $('#song1');

  var _commands = {

    music: function(vol, name) {
      if(_logged) {
          /*
          if ( !window.webkitAudioContext ) {
          return ['Your browser does not support his feature :('];
        }
        */
        var returnable = [];
        
            if(vol == "stop") {
              _$audio.animate({volume: 0}, _timeOut);
              setTimeout(_audio.pause(),_timeOut);
              returnable =  ['Song Stopped', 'Enjoy the Silence'];
            } else {
                _audio.src = 'music/' + name + '.mp3';
                _$audio.animate({volume: vol}, _timeOut);
                _audio.play();
              
              returnable = ['Song: ' + name,
                            'Type in `music stop` to not hear the groove'];
            }

        return (returnable).join("\n");
      } else {
        return "Log in first! Bozo!\n";
      }
      
    },

    songs : function () {

        return _songs.join("\n");
    },

    login : function(name) {
        console.log(name);
        if(name == undefined)
          return "You need a name buddy!";
        if(!_logged) {
          _user = name;
          _logged = true;
          return ("Success! Welcome to the family kid\nWrite `help` and see what's up");
        } else {
          return ("You're already in stupid\nWrite `help` to see what you can do");
        }
    },
    logout : function() {
        var element = document.getElementById("output");
        element.value = "";
        if(_logged) {
          _logged = false;
          _user = "";
          
          return "Stay in the shadows\n";
        } else {
          return "I don't think any of us is this stupid, who are ya again?\n";
        }
    },

    ls: function(dir) {
      if(_logged) {
        var out = [];

        out.push('\nNETWORKS:');
        $.each(_networks, function(index, value) {
            console.log(value);
            out.push('- ' + value['network_name']);
        });

        out.push('\nType connect <network_name> to access what you need');
        out.push('and `help` for more');


        $.display('networks.jpeg');

        _curImage = 'networks';

        setTimeout($.hide,7000);

        return out.join("\n");
      
      } else {
        return "Man, seriously! login <name> ! Do that!\n";
      }
    },

    connect : function(network_name) {
      if(_logged) {
        var out = [];

        network_name = network_name.toLowerCase();



        var searched_network = $.grep(_networks, function(e) {
            return e.network_name.toLowerCase().indexOf(network_name) > -1;
        });

        var searched_network = searched_network[0];

        _curNetwork = searched_network;

        if(searched_network == undefined)
            return '\nNetwork not found';
        console.log(searched_network.network_name);

        var nodes = $.grep(_nodes, function(e) {
            return e.network_id == searched_network['network_id'];
        });

        var characters = $.grep(_characters, function(e) {
            return e.network_id == searched_network['network_id'];
        });

        console.log(nodes);

        out.push('DESCRIPTION:');
        out.push(searched_network.network_description);
        out.push('\nNOTES:');
        out.push(searched_network.network_notes);
        out.push('\nNODES:');

        $.each(nodes, function(index,value) {
            out.push('- ' + value['node_name']);
        });

        out.push("\nCHARACTERS:");

        $.each(characters, function(index,value) {
            out.push('- ' + value['char_name'] + ' - ' + value['char_status']);
        });

        out.push('\nType `help` for more things to play with');

        console.log('before autoplay');
        if(_autoplay.indexOf('true') > -1) {
                console.log('after autoplay');
                _audio.src = 'music/' + searched_network['network_image'] + '.mp3';
                _$audio.animate({volume: 1}, _timeOut);
                _audio.play();
        }

        $.display(searched_network['network_image'] + '.png');

        _curImage = searched_network['network_image'];

        setTimeout($.hide,7000);

        return out.join('\n');

      } else {
          return "I said login dammit!";
      }
    },
    enter: function(node) {
        if(_logged) {
        var out = [];

        node = node.toLowerCase();



        var searched_none = $.grep(_nodes, function(e) {
            return e.node_name.toLowerCase().indexOf(node) > -1;
        });

        var searched_none = searched_none[0];

        _curNode = searched_none;

        if(searched_none == undefined)
            return '\nNode not found';
        console.log(searched_none.node_name);

        var element = document.getElementById("output");
        element.value = "";

        out.push(searched_none.node_title);

        out.push('\nType `help` for more things to play with');

       // $.display(network_name + '.png');

       // setTimeout($.hide,4000);

        return out.join('\n');

      } else {
          return "I said login dammit!";
      }
    },
    check: function(character) {
        if(_logged) {
        var out = [];

        character = character.toLowerCase();

        var searched_character = $.grep(_characters, function(e) {
            return e.char_name.toLowerCase().indexOf(character) > -1;
        });

        var searched_character = searched_character[0];

        _curCharacter = searched_character;

        if(searched_character == undefined)
            return '\nWe don`t know this person';
        console.log(searched_character.char_name);

        out.push('DESCRIPTION:');
        out.push(searched_character.char_description);

        out.push('Type help to see what else you can do');

        $.display(searched_character.char_image + '.png');

        _curImage = searched_character.char_image;

        setTimeout($.hide,7000);

        return out.join('\n');

      } else {
          return "I said login dammit!";
      }
    },

    cd: function(dir) {
      if(_logged) {
        if ( !dir ) {
          return (["You need to supply argument: dir"]).join("\n");
        }

        var dirname = parsepath(dir);
        var iter = getiter(dirname);
        if ( dirname == '/' || (iter && iter.type == 'dir')) {
          _cwd = dirname;
          return (['Entered: ' + dirname]).join("\n");
        }

        return (["Path not found: " + dirname]).join("\n");
      } else {
         return "Access denied! Idiot... Use 'login <name>'\n";
      }
    },
    autoplay: function(key) {
        _autoplay = key;

        var out = [];

        if(_autoplay.indexOf('false') > -1) {
            out.push('Autoplay is now off\nDo whatever you want');
        } else if(_autoplay.indexOf('true') > -1) {
            out.push('Autoplay on, I love this thing,kid');
        } else {
            out.push('Pay attention pisspot!');
        }

        return out.join('\n')
    },

    clear: function() {
      if(_logged)
        return false;
      else
        return "Show you're one of us first new blood\n";
    },
    contact: function (key) {
      key = key || '';
      var out = [];

      switch ( key.toLowerCase() ) {
        case 'email' :
          window.open('mailto:greenbluebit@gmail.com');
          break;
        case 'github' :
          window.open('https://github.com/GreenBlueBit');
          break;
        case 'linkedin' :
          window.open('https://www.linkedin.com/profile/view?id=233455726');
          break;
        case 'twitter' :
          window.open('https://twitter.com/GreenBlueBit');
          break;
        case 'google+' :
          window.open('https://plus.google.com/117032737690537551047/posts');
          break;

        default :
          if ( key.length ) {
            out = ['Invalid key: ' + key];
          } else {
            out = [
              "Contact information:\n",
              'Name:      Anders Evenrud',
              'Email:     andersevenrud@gmail.com',
              'Github:    https://github.com/andersevenrud/',
              'LinkedIn:  http://www.linkedin.com/in/andersevenrud',
              'YouTube:   https://www.youtube.com/user/andersevenrud',
              'Wordpress: http://anderse.wordpress.com/',
              'Twitter:   https://twitter.com/#!/andersevenrud',
              'Google+:   https://profiles.google.com/101576798387217383063?rel=author'
            ];
          }
          break;
      }

      return out.join("\n");
    },
    kudos: function (key) {
        var handledData = {};
        handledData.action = 'postKudos';
        handledData.kudos = 'key';

        $.ajax({
                type:"GET",
                url:_connectionUrl + "php/api.php",
                data: handledData,
                cache: false,
                datatype:'json',
                success:function(data)
                {
                    console.log(data);
                    console.log('success');

                },
                error : function(data) 
                {
                    console.log('success');
                }
                                   
            });

        var out = [];

        out.push('Thanks fledgling, your opinion is muy importante for ol` Gary!');

        return out;
    },
    help: function() {
      if(_logged) {
          var out = [
          'kudos <key>                                  Message the Creator',
          'contact                                      Breadcrumbs to find the Creator',
          'contact <key>                                Open page (ex: email , github, facebook',
          'ls                                           List of possible networks to checkout',
          'connect <network_name>                       Connects to a network full of goodies',
          'enter <node>                                 Enter a node to get access to the smut we love',
          'check <character>                            Check one of these weirdos out',
          'clear                                        Clears the screen',
          'music <volume 0-1> <name>]                   Listen to some tunes, release the inner asshole',
          'music <stop>                                 Stops the awesome groove',
          'display                                      Show current image',
          'hide                                         Hide current image',
          'autoplay <true/false>                        Turns the playlist on or off',
          ''
        ];

        return out.join("\n");
      } else {
        return "I ain't gon' help you stranger\n";
      }
      
    },

    display: function() {
      if(_logged) {
          $.display(_curImage + '.png');

          return "There she be\n";
      } else {
          return "Log in first!\n";
      }
        
    },

    hide : function () {
      if(_logged) {
         $.hide();

         return "Image hidden\n";   
      } else {
        return "Nothing to hide kid\n";
      }
     
    }

  };

  _audio.play();
  _$audio.animate({volume: 1}, _timeOut);

  var handledData = {};
  handledData.action = 'getNetworks';

  $.ajax({
          type:"GET",
          url:_connectionUrl + "php/api.php",
          data: handledData,
          cache: false,
          datatype:'json',
          success:function(data)
          {
            var holder = jQuery.parseJSON(data);

            _networks = holder;
            
            console.log(_networks);


          },
          error : function(data) 
          {
            console.log(data);
          }
                             
      });

  handledData.action = 'getNodes';

  $.ajax({
          type:"GET",
          url:_connectionUrl + "php/api.php",
          data: handledData,
          cache: false,
          datatype:'json',
          success:function(data)
          {

            var holder = jQuery.parseJSON(data);
            
            _nodes = holder;

            console.log(_nodes);

          },
          error : function(data) 
          {
            console.log(data);
          }
                             
      });

  handledData.action = 'getCharacters';

  $.ajax({
          type:"GET",
          url:_connectionUrl + "php/api.php",
          data: handledData,
          cache: false,
          datatype:'json',
          success:function(data)
          {
            var holder = jQuery.parseJSON(data);

            _characters = holder;

            console.log(_characters);


          },
          error : function(data) 
          {
            console.log(data);
          }
                             
      });

  $.terminal(_commands,function() { return "Initializing ShreckNET\nUse `login <name>` to connect\n\n";},"Initializing ShreckNET\nUse `login <name>` to connect\n\n");
  
});

    