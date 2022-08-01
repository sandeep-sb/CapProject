import React from "react";
import "./SliderComponent.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function SliderComponent() {
  const [SongData, setSongData] = React.useState([]);

  React.useEffect(() => {
    //const apikey='37fa14ba27d26e5cefaed6b5832eb835';
    //let urllastfm=`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apikey}&format=json`
    //let myapiurl="http://localhost:8000/api/topArtists"
    fetch("https://muzixcloud.herokuapp.com/api/getNewRelease")
      .then((res) => res.json())
      .then((data) => {
        setSongData(data.albums.items);
      });
  }, []);

  return (
    <div className="SliderComponent">
      <h2 className="SliderComponentHeading SongComponentHeading">
        New Release Songs
      </h2>
      <div className="Sub-SliderComponent">
        {SongData.map((Song) => (
          <div className="card">
            <Card
              sx={{
                backgroundColor: "#485461",

                backgroundImage:
                  "linear-gradient(315deg, #485461 0%, #28313b 74%)",
                color: "white",
              }}
            >
              <CardActionArea>
                <img
                  src={Song.images[1].url}
                  alt="Card image"
                  id="newSongImage"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      color: "darkGrey",
                    }}
                  >
                    {Song.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "lightgrey" }}
                  >
                    {Song.artists[0].name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
