import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import NoImagesFound from './components/NoImagesFound';

const App = () => {
  const initialState = [];
  const [images, setImages] = useState(initialState);

  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    // fetch from the api
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
    )
      .then((res) => res.json())
      .then((data) => {
        // set state of the images here
        setImages(data.hits);
        // set loading to true
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="container mx-auto">
      {/* here we pass down the props down to the search component
        we run a method here directly that takes in a text, the text
        is what was entered in the search component.. e.target.value
      */}
      <ImageSearch searchText={(text) => setTerm(text)} />

      {/* we check to see if it isnt loadin must have fetched give a user a response
        if no images were found
      */}
      {!isLoading && images.length === 0 && <NoImagesFound />}

      {isLoading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {/* pass in props, loop through the each image and pass down props to
          the image component
        */}
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
