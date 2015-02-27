
 var _timeOut = 1000;
 var _logged = false
 var _user = "";
 var _connectionUrl = 'http://localhost/elite_terminal/';
 var _songs = ['menu','new_york_groove','pina_colada','spirit_in_the_sky','la_grange','juke_box_hero','cruise_1','cruise_2','china_grove','carry_on_son','bad_ted'];
 var _news = [];
 var _autoplay = "true";
 var _curArticle = "";
 var _page = 5;
 var _song = 1;
$(document).ready(function () {

  var _audio = document.getElementById('song');
  var _$audio = $('#song');

  var _commands = {
      help : function () {
          var out = [
          'creator                                      Public logs of Cmdr Ted',
          'kudos <key>                                  Message Cmdr Ted Blop',
          'contact                                      Possible communication channels',
          'contact <key>                                Open channel (ex: email , github, facebook',
          'news                                         Show the entire Galnet feed',
          'read <title>                                 Read an interesting article',
          'next                                         Read the next article/page',
          'back                                         Read the previous article/page',
          'clear                                        Clears the screen',
          'songs                                        Get a list of all the music we got',
          'music <volume 0-1> <name>]                   Listen to some tunes',
          'music <stop>                                 Stop the music, focus on the mission',
          'autoplay <true/false>                        Turns the autoplay on or off',
          ''
          ];

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

        out.push('Thank you Cmdr! o7');

        return out;
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
              'Name:      Theodor Purcaru',
              'Email:     greenbluebit@gmail.com',
              'Github:    https://github.com/GreenBlueBit/',
              'LinkedIn:  https://www.linkedin.com/profile/view?id=233455726',
              'Twitter:   https://twitter.com/GreenBlueBit',
              'Google+:   https://plus.google.com/117032737690537551047/posts'
            ];
          }
          break;
      }

      return out.join("\n");
    },
    autoplay: function(key) {
        _autoplay = key;

        var out = [];

        if(_autoplay.indexOf('false') > -1) {
            out.push('Autoplay off');
        } else if(_autoplay.indexOf('true') > -1) {
            out.push('Autoplay on');
        } else {
            out.push('Pay attention cmdr!');
        }

        return out.join('\n')
    },

    clear: function() {
            return false;
    },
    music: function(vol, name) {
          /*
          if ( !window.webkitAudioContext ) {
          return ['Your browser does not support his feature :('];
        }
        */
        var returnable = [];
        
            if(vol == "stop") {
              _audio.pause();
              returnable =  ['Song Stopped', 'Enjoy the Silence'];
            } else {
                _audio.src = 'music/' + name + '.mp3';
                _$audio.animate({volume: vol}, _timeOut);
                _audio.play();
              
              returnable = ['Song: ' + name,
                            'Type in `music stop` to stop the player'];
            }

        return (returnable).join("\n");
      
    },

    songs : function () {

        return _songs.join("\n");
    },
    news : function (key) {

        var out = [];

        out.push('\nLoading GALNET...\n');


        for(var i = 0; i < 4; i++) {
          console.log(_news[i]);
           var title = _news[i]['title'];
           title = title.toUpperCase();



           var description = _news[i]['description'];
           description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');
           console.log(description);
           description = description.substring(0,76) + '...';

           out.push(title + ':' + ' - ' + description + '\n\n');
        }

        _curArticle = "";

        return out.join('\n');

    },
    read : function (key) {

        var out = [];

        if(key != undefined) {
            key = key.toLowerCase();
           var searched_article = $.grep(_news, function(e) {
            return e.title.toLowerCase().indexOf(key) > -1;
           });

           searched_article = searched_article[0];

           console.log(searched_article);

           if(searched_article == undefined) {
              out.push('Nothing found, sorry!');
              return out.join('\n');
           }
           var title = searched_article['title'];
           title = title.toUpperCase();

           _curArticle = title;

           var description = searched_article['description'];
           description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');

           out.push(title + ':' +  description + '\n\n');
        } else {
           out.push('What do you want to read Commander?');
        }

        return out.join('\n');
    }, next : function () {
        var out = [];

        if(_curArticle != "") {
          var index;
          $.each(_news, function(i, value) {
              if(value['title'].toUpperCase() == _curArticle) {
                  index = i;
                  return;
              }

          });
          
          console.log(_curArticle);
          console.log(index);

            if(index >= (_news.length-1) || index == undefined)
                index = -1;

               var searched_article = _news[(index+1)];
               console.log(index);

               console.log(_news[(index+1)]);
               console.log(_news);

               console.log(searched_article);

               var title = searched_article['title'];
               title = title.toUpperCase();

               _curArticle = title;

               var description = searched_article['description'];
               description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');

               out.push(title + ':' +  description + '\n\n');            
            
        } else {
            out.push('\nLoading GALNET...\n');

            if((_page + 4) > _news.length)
                _page = 5;

              console.log('page before for:' + _page);
                for(var i = _page; i < (_page + 4); i++) {
                  console.log(i);

                  
                  console.log(_news[i]);
                   var title = _news[i]['title'];
                   title = title.toUpperCase();



                   var description = _news[i]['description'];
                   description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');
                   console.log(description);
                   description = description.substring(0,76) + '...';

                   out.push(title + ':' + ' - ' + description + '\n\n');
                   
                }
                _page+=4;

                console.log('page after: ' + _page);
             
            
        }
     
      return out.join('\n');   
    } , back : function () {
        var out = [];

        if(_curArticle != "") {
          var index;
          $.each(_news, function(i, value) {
              if(value['title'].toUpperCase() == _curArticle) {
                  index = i;
                  return;
              }

          });
          
          console.log(_curArticle);
          console.log(index);

            if(index == 0 || index == undefined)
                index = _news.length;

               var searched_article = _news[(index-1)];
               console.log(searched_article);

               console.log(searched_article);

               var title = searched_article['title'];
               title = title.toUpperCase();

               _curArticle = title;

               var description = searched_article['description'];
               description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');

               out.push(title + ':' +  description + '\n\n');            
            
        } else {
            out.push('\nLoading GALNET...\n');

            if((_page - 4) <= 0)
                _page = _news.length-1;
              
              console.log('page before for:' + _page);
                for(var i = _page; i > (_page - 4); i--) {
                  console.log(i);

                  
                  console.log(_news[i]);
                   var title = _news[i]['title'];
                   title = title.toUpperCase();



                   var description = _news[i]['description'];
                   description = description.replace(/&nbsp;/g, ' ').replace(/<br.*?>/g, '\n');
                   console.log(description);
                   description = description.substring(0,76) + '...';

                   out.push(title + ':' + ' - ' + description + '\n\n');
                   
                }
                _page-=4;

                console.log('page after: ' + _page);
             
            
        }
     
      return out.join('\n');   
    }, creator : function() {

        var out = [];

        out.push("Name: Theodor F Purcaru");
        out.push("Earth Job : Full Stack Developer");
        out.push("`Verse Job : Full Stack Cmdr");
        out.push('\nDeveloper by day and pilot by night,\nexcept for the times when it`s reversed.')
        out.push('Quote:`I love Elite, so I made this demo\nfor my plugin for people to have a but of fun`');
        out.push('Hangs around Denmark,Aalborg when in the Sol system.');
        out.push('Seen taking bounties and trading around Eravate');
        out.push('\n\n\n');
        out.push('Strengths: Made the Kessel Run in 14 Parsecs');
        out.push('           Divided by 0 once');
        out.push('           Ridiculously attractive while alone');
        out.push('           Can press keys and stuff happens');
        out.push('Wea**sses: Cannot spell this word');
        out.push('           Dividing by 0 resulted in the Star Wars Prequels');
        out.push('           So tall the height value gives an overflow error');
        out.push('           and resets itself, making him look short');
        out.push('           Took the blue pill');

        _audio.src = 'music/' + 'bad_ted' + '.mp3';
        _audio.play();

        $.display('ted.jpg');

        setTimeout($.hide,5000);

        return out.join('\n');
    } 

  };

  _audio.play();
  _$audio.animate({volume: 1}, _timeOut);

  $("#song").bind('ended', function(){
      if(_autoplay == 'true')
        playMusic();
  });

  $('#big-btn').click(changeComputer);

  $.terminal(_commands,function() { return "Welcome Commander,\nPlease make use of our amenities as you see fit\n\n";},"Welcome Commander,\nPlease make use of our amenities as you see fit\n\n");
  
  var handledData = {};
        handledData.action = 'getFeed';
        handledData.feed_url = 'http://elitedangerous.com/news/galnet/rss';

        $.ajax({
                type:"GET",
                url:_connectionUrl + "php/api.php",
                data: handledData,
                success:function(data)
                {

                    _news = jQuery.parseJSON(data);
                    _news = _news["item"];
                    //console.log(data);
                    console.log('success');

                },
                error : function(data) 
                {
                    console.log('success');
                }
                                   
        });

});

     function playMusic() {
          var _audio = document.getElementById('song');
          var _$audio = $('#song');
          if(_song >= _songs.length)
            _song = 0;

          _audio.src = 'music/' + _songs[_song] + '.mp3';
          _$audio.animate({volume: vol}, _timeOut);
          _audio.play();
          _song++;
     }

     function changeComputer() {
        window.open('http://demos.bluebit.nu/terminal/');
     }