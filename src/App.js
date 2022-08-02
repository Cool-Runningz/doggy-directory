import React, { useState } from "react";
import useFetchAsync from "./hooks/useFetchAsync";
import placeholderImg from "./images/undraw_relaxing_walk.svg";

function App() {
  const [selectedBreed, setSelectedBreed] = useState("");
  const [{ data: breeds, loading: loadingBreeds }] = useFetchAsync("https://dog.ceo/api/breeds/list/all")
  const [{ data: dogData, loading: loadingImages }, fetchImages] = useFetchAsync()
  const { message: dogImages = [] } = dogData

  const searchByBreed = () => {
    fetchImages(`https://dog.ceo/api/breed/${selectedBreed}/images`)
  };

  return (
    <div className="d-flex justify-content-center flex-column text-center">
      <header>
        <h1 className="mt-4 mb-5">Doggy Directory 🐶</h1>
      </header>
      <main role="main">
        <div className="d-flex justify-content-center">
          <select
            disabled={loadingBreeds}
            className="form-select w-25"
            aria-label="Select a breed of dog to display results"
            value={selectedBreed}
            onChange={(event) => setSelectedBreed(event.target.value)}
          >
            <option value="" disabled>
              Select a breed
            </option>
            {breeds.length === 0 ? [] : Object.keys(breeds.message).map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-info mx-2"
            disabled={!selectedBreed}
            onClick={searchByBreed}
          >
            Search
          </button>
        </div>
        {!loadingImages && (
          <div className="px-5 mx-5 text-end" data-testid="results-count">
            <p className="fs-5">{dogImages.length} results</p>
          </div>
        )}
        <div className="mt-5 d-flex justify-content-center flex-wrap px-5 mx-5">
          {dogImages.length === 0 && !loadingImages && (
            <img
              src={placeholderImg}
              className="mx-auto d-block mt-4 w-50"
              alt=""
            />
          )}
          {loadingImages && (
            <div className="d-flex align-items-center ">
              <p className="h1 me-2">Loading</p>
              <div
                className="spinner-border ms-auto text-info fs-3"
                role="status"
                aria-hidden="true"
              />
            </div>
          )}
          {dogImages.length > 0 &&
            !loadingImages &&
            dogImages.map((imgSrc, index) => (
              <img
                key={`${index}-${selectedBreed}`}
                src={imgSrc}
                className="img-thumbnail w-25"
                alt={`${selectedBreed} ${index + 1} of ${dogImages.length}`}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
