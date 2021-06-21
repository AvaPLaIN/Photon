const auth = '563492ad6f91700001000001438b05756f8945209a666296f4ab0795';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitButton = document.querySelector('.submit-btn');

let searchValue;
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  let query = searchInput.value;
  searchPhotos(query);
  searchInput.value = '';
});

async function curatedPhotos() {
  const data = await fetchApi(
    'https://api.pexels.com/v1/curated?per_page=15&page=1'
  );
  appendPhotos(data);
}

async function searchPhotos(query) {
  deletePhotos();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
  );
  appendPhotos(data);
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function appendPhotos(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `<img src="${photo.src.large}"></img><p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

function deletePhotos() {
  gallery.innerHTML = '';
}

curatedPhotos();
