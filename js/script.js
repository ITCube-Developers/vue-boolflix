// chiave api 6ef857fc5320b290e8bcd3f87290f56a
// esempio chiamata
// https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query=jdajsdajldalk
var app = new Vue (
{
    el: "#app",
    data: {
      moviesResult: [],
      seriesResult: [],
      research: "",
      welcome: true,
      visible: true,
      moviesError: false,
      seriesError: false,
      totalResult: -1,
      flag_language: "",
      italianFlag: "https://img.icons8.com/color/2x/italy-circular.png",
      englishFlag: "https://img.icons8.com/color/2x/great-britain-circular.png",
      spanishFlag: "https://img.icons8.com/color/2x/spain2-circular.png",
      noFlag: "https://img.icons8.com/color/2x/globe.png",
      adress: "https://image.tmdb.org/t/p/w220_and_h330_face",
    },



    methods: {

      

      movieResearch: function() {
        const self = this;
        self.welcome = false;
        self.moviesError = false;
        self.moviesResult = [];

        if (self.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=fale&query="+self.research)
          .then(function (result) {
              self.moviesResult = result.data.results;
              self.totalResult = result.data.total_results;
              self.totalPage = result.data.total_pages;

              if (self.moviesResult == 0 && self.seriesResult == 0) {
                self.moviesError = true;
              }

              console.log(self.totalResult);


              for ( var i=0; i < self.moviesResult.length; i++) {
                const item = self.moviesResult[i];
                item.vote_average = Math.floor(Math.round(item.vote_average)/2);
                item.rankStar = 1 * item.vote_average;
                item.emptyStar = 5 - item.rankStar;
                item.movie_id = item.id;
                item.cast = [];
                item.genre = [];

                switch (item.original_language) {
                  case "it":
                  item.flag_language = self.italianFlag;
                  break;
                  case "en":
                  item.flag_language = self.englishFlag;
                  break;
                  case "es":
                  item.flag_language = self.spanishFlag;
                  break;
                  default:
                  item.flag_language = self.noFlag;
                }

                axios
                .get("https://api.themoviedb.org/3/movie/"+item.movie_id+"/credits?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=")
                .then(function (result) {
                  for (var i = 0; i < result.data.cast.length; i++) {
                  if (item.cast.length < 5) {
                    item.cast.push(result.data.cast[i].name);
                    console.log(item.cast);
                  }
                }
                self.$forceUpdate();
                })

                axios
                .get("https://api.themoviedb.org/3/movie/"+item.movie_id+"?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=")
                .then(function (result) {
                  for (var i = 0; i < result.data.genres.length; i++) {
                  if (item.genre.length < 2) {
                    item.genre.push(result.data.genres[i].name);
                    console.log(item.genre);
                  }
                }
                self.$forceUpdate();
                })
              }




            }
          )
        }
      },

      serieResearch: function() {
        const self = this;
        self.welcome = false;
        self.seriesError = false;
        self.seriesResult = [];

        if (self.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query="+self.research)
          .then(function (result) {
              self.seriesResult = result.data.results;
              self.totalResult = result.data.total_results;
              self.totalPage = result.data.total_pages;

              if (self.seriesResult == 0 && self.moviesResult == 0) {
                self.seriesError = true;
              }

              for ( var i = 0; i < self.seriesResult.length; i++) {
                var item = self.seriesResult[i];
                item.vote_average = Math.floor(Math.round(item.vote_average)/2);
                item.rankStar = 1 * item.vote_average;
                item.emptyStar = 5 - item.rankStar;
                item.cast = [];
                item.serie_id = item.id;
                item.genre = [];

                switch (item.original_language) {
                      case "it":
                      item.flag_language = self.italianFlag;
                      break;
                      case "en":
                      item.flag_language = self.englishFlag;
                      break;
                      case "es":
                      item.flag_language = self.spanishFlag;
                      break;
                      default:
                      item.flag_language = self.noFlag;

                    }
                    axios
                    .get("https://api.themoviedb.org/3/tv/"+item.serie_id+"/credits?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=")
                    .then(function (result) {
                      for (var i = 0; i < result.data.cast.length; i++) {
                      if (item.cast.length < 5) {
                        item.cast.push(result.data.cast[i].name);
                        console.log(item.cast);
                      }
                    }
                    self.$forceUpdate();
                    })

                    axios
                    .get("https://api.themoviedb.org/3/tv/"+item.serie_id+"?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=")
                    .then(function (result) {
                      for (var i = 0; i < result.data.genres.length; i++) {
                      if (item.genre.length < 2) {
                        item.genre.push(result.data.genres[i].name);
                        console.log(item.genre);
                      }
                    }
                    self.$forceUpdate();
                    })
            }
            return self.research = "";





        })
        }
      },



      backToHome: function() {
        const self = this;
        if (self.research == false) {
          self.welcome = true;
          self.totalResult = -1;
          self.moviesResult = false;
          self.seriesResult = false;
          self.moviesError = false;
          self. seriesError = false;
        }
      },

    },

  }
);
