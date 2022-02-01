import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const FooterMap = props => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <Map
      google={props.google}
      style={mapStyles}
      initialCenter={{ lat: 23.2619279, lng: 89.0092563 }}
      zoom={10}
    >
      <Marker
        position={{ lat: 23.2619279, lng: 89.0092563 }}
        icon={{
          url: `${process.env.PUBLIC_URL + "/assets/img/icon-img/2.png"}`,
        }}
        animation={props.google.maps.Animation.BOUNCE}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyB2D8wrWMY3XZnuHO6C31uq90JiuaFzGws",
})(FooterMap);
