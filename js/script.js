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
      error: false,
      totalPage: 1,
      totalResult: "",

      adress: "https://image.tmdb.org/t/p/w220_and_h330_face",
    },

    methods: {

      movieResearch: function() {
        const self = this;
        self.welcome = false;

        if (self.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query="+self.research)
          .then(function (result) {
              self.moviesResult = result.data.results;
              self.totalResult = result.data.total_results;
              self.totalPage = result.data.total_pages;

              if (self.moviesResult == 0) {
                self.totalPage = 0;
              }

              self.moviesResult.forEach(
                (item) => {
                item.vote_average = Math.floor(Math.round(item.vote_average)/2);
                item.rankStar = 1 * item.vote_average;
                item.emptyStar = 5 - item.rankStar;
                }
              );
            }
          )
        }
      },

      serieResearch: function() {
        const self = this;
        self.welcome = false;

        if (self.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query="+self.research)
          .then(function (result) {
              self.seriesResult = result.data.results;
              self.totalResult = result.data.total_results;
              self.totalPage = result.data.total_pages;

              if (self.seriesResult == 0) {
                self.totalPage = 0;
              }

              self.seriesResult.forEach(
                (item) => {
                item.vote_average = Math.floor(Math.round(item.vote_average)/2);
                item.rankStar = 1 * item.vote_average;
                item.emptyStar = 5 - item.rankStar;
                }
              );
            }
          )
          return self.research = "";

        }
      },

      backToHome: function() {
        const self = this;
        if (self.research == false) {
          self.welcome = true;
          self.moviesResult = false;
          self.seriesResult = false;
          self.error = false;
        }
      }
    },
  }
);
