import React, {useState, useEffect} from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(()=>{
    //make sure to use `
    //change key to get key from .env
    //changes yellow-flow to ${term} -> to change searches by default is empty string
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
    //study this then and fetch
    .then(res => res.json()) 
    .then(data => {
      setImages(data.hits); //learn more about hits
      setIsLoading(false); //data is done loading
    })
    .catch(err => console.log(err));
  }, [term]); // [] for dependecy *research more about this *
//whenever dependecy changes all of what's inside useEffect runs again

  return (
    <div className="container mx-auto">
       <ImageSearch searchText={(text)=>setTerm(text)} />

       {/* check if not loading and no images and no image found text */}
       {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No images found</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap4">
        {images.map(image =>(
          <ImageCard key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;
