import { useState, useEffect } from "react";

const CLIENT_ID = "cf262af7c1624d459658211f15327d08";
const CLIENT_SECRET = "83659777dc36460ba1f4fc3a09a03378";

function Form() {
  const [searchInput, setSearchInput] = useState(" ");
  const [accessToken, setAccessToken] = useState(" ");

  const [albums, setAlbums] = useState([]);

  // execute once using useEffect

  useEffect(() => {
    // API access token
    var authPara = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authPara)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search(event) {
    event.preventDefault();
    console.log("searching " + searchInput);

    // Search for getting artist ID
    // get artist ID

    var searchArtistPara = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistId = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchArtistPara
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log("Artist id - " + artistId);

    // grab all the albums from that artist

    var albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistId +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchArtistPara
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });
  }
  // console.log(albums);
  return (
    <div className="bg-gray-300 mx-56 h-full px-4 py-20 rounded-b shadow-md justify-top min-w-0">
      <div className="">
        <form action="" method="">
          <div className="flex gap-1">
            <input
              type=""
              name="search"
              placeholder="Search..."
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  search(event);
                  setSearchInput(event.target.value);
                }
                console.log("U searched " + searchInput);
              }}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button
              onClick={search}
              className="text-white   bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-4 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* cards items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2  mt-6">
        {albums.map((album) => {
          console.log(album);
          return (
            <div className="max-w-sm w-48 bg-white border my-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p>
                <img
                  className="rounded-t-lg"
                  src={album.images[0].url}
                  alt="album"
                />
              </p>
              <div className="p-5">
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {album.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Form;
