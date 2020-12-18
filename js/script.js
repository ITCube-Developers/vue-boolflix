// chiave api 6ef857fc5320b290e8bcd3f87290f56a
// esempio chiamata
// https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query=natale
var app = new Vue (
{
    el: "#app",
    data: {
      moviesResult: [],
      research: "",

    },

    methods: {

      movieResearch: function() {
        const self = this;

        if (this.research != "") {
          axios
          .get("https://api.themoviedb.org/3/search/movie?api_key=6ef857fc5320b290e8bcd3f87290f56a&language=it-IT&page=1&include_adult=false&query="+self.research )
          .then( (result) => {
            self.moviesResult = result.data.results;
            self.moviesResult.adress = "https://image.tmdb.org/t/p/w220_and_h330_face/aKTMkzvU4rbABmbVHKs1iiIInxL.jpg"
            console.log(self.moviesResult);
            console.log(self.adress);

            return this.research = "";
          });

        }



      }

    },
}
);
