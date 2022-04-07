import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Login = () => {
	const CLIENT_ID = 'ee416f8946944eac93de1274207f1dad';
	const REDIRECT_URI = 'http://localhost:3000';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';
	const SCOPE = 'playlist-modify-private';
  const accToken = useSelector((state) => state.spotify.accessToken);
  const history = useHistory();

	useEffect(() => {
    if (accToken) history.push("/create-playlist");
  }, [accToken, history]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-bold">Login to your Spotify account</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-pink-400 rounded-t-md"></div>
            <div className="py-6 px-8 text-center">
              <img src={require('../../assets/images/MediFy-Logo.png')} alt="MediFy Logo" />
              <br />
                <a className="mt-4 mb-8 bg-indigo-800 hover:bg-indigo-900 text-white text-lg font-bold py-2 px-8 rounded-full"
                  href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                  Login
                </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
