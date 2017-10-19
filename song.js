class Song {
  constructor(name, album, artist, uri) {
    this.name = name;
    this.album = album;
    this.artist = artist;
    this.uri = uri;
    Song.all.push(this);
  }

  trackTemplate() {
    const songHTML = `
    <li>Song Name: ${this.name}
        <ul>
        <li>Artist Name: ${this.artist}</li>
        <li>Album Name: ${this.album}</li>
        <li><button data-uri="${this
          .uri}" type="button">Preview Song</button></li><br>
        <iframe id="${this
          .uri}" class="visibility" src='https://open.spotify.com/embed?uri=${this
      .uri}' width='300' height='380' frameborder='0' allowtransparency="true"></iframe>
        </ul>
    </li>`;
    return songHTML;
  }

  static renderSongs(songs) {
    const songHTML = `<ul>
    ${songs
      .map(song => {
        return song.trackTemplate();
      })
      .join("")}
    </ul>`;

    return songHTML;
  }
}

Song.all = [];
