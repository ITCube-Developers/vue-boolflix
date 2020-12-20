// chiave api 6ef857fc5320b290e8bcd3f87290f56a
// esempio chiamata
// https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query=natale
var app = new Vue (
{
    el: "#app",
    data: {
      moviesResult: [],
      research: "",
      adress: "https://image.tmdb.org/t/p/w220_and_h330_face",
    },

    methods: {

      movieResearch: function() {
        const self = this;

        if (self.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query="+self.research )
          .then(function (result) {
              self.moviesResult = result.data.results;
              self.totalResult = result.data.total_results;
              self.moviesResult.forEach(
                (item) => {
                item.vote_average = Math.floor(Math.round(item.vote_average)/2);
                item.rankStar = 1 * item.vote_average;
                }
              );
            }
          )
          return self.research = "";
        }
      },

      backTohome: function() {
        const self = this;
        if (self.moviesResult != false) {
          self.moviesResult = false
        }
      }
    },
  }
);
