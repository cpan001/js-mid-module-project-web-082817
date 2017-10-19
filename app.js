class App {
  constructor() {
    this.results = document.getElementById("results");
    this.form = document.getElementsByTagName("form")[0];
  }

  addAllEventListeners() {
    this.form.addEventListener("submit", this.fetchSongs.bind(this));
    this.results.addEventListener("click", this.previewSongs.bind(this));
  }

  serialize(term) {
    return term.split(" ").join("+");
  }

  previewSongs(e) {
    e.preventDefault();
    if (e.target && e.target.innerHTML === "Preview Song") {
      const uri = e.target.dataset.uri;
      document.getElementById(`${uri}`).classList.toggle("visibility");
    }
  }

  fetchSongs(e) {
    e.preventDefault();
    const token = "";
    const term = this.serialize($("#searchSong").val());
    const searchLimit = 5;
    const searchOffset = 0;
    const searchType = "track";
    const baseUrl = "https://api.spotify.com/v1/search?q=";
    const fetchUrl = `${baseUrl +
      term}&type=${searchType}&market=US&limit=${searchLimit}&offset=${searchOffset}`;
    $("#searchSong").val("");
    $("#results").html("");
    fetch(fetchUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        const songs = json.tracks.items;
        const songObjs = songs.map(song => {
          return new Song(
            song.name,
            song.album.name,
            song.artists[0].name,
            song.uri
          );
        });
        $("#results").append(Song.renderSongs(songObjs));
        Song.all = [];
      });
  }
}
