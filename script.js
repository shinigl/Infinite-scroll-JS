let loadingDiv = document.getElementById('loading');
let imgContainer = document.getElementById('infinite-scroll-wrapper');
let modal = document.getElementById('modal');
let modalImage = document.getElementById('modal-image');
let closeModal = document.getElementById('close-modal');

let apiKey = "K8UXfWbYDjyvuamVEYwonWn4Hs1nW9FV2n7J8HwBO60";
let url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=10`;

getPhotos(); // Call function to load initial images

async function getPhotos() {
    try {
        loadingDiv.style.display = 'block';

        let response = await fetch(url);
        let data = await response.json();

        console.log('Data received:', data);

        // Add images to the container
        data.forEach((image) => {
            let img = document.createElement('img');
            img.src = image.urls.small;
            img.alt = image.alt_description || 'Image';
            img.loading = 'lazy'; // Enable lazy loading
            img.style.cursor ='pointer'; 
    

            // Add click event listener to each image
            img.addEventListener('click', () => openModal(image.urls.small));

            imgContainer.appendChild(img);
        });
    } catch (err) {
        console.error('Error fetching photos:', err);
        alert('Failed to load images. Please try again later.');
    } finally {
        loadingDiv.style.display = 'none'; // Hide loading spinner after loading
    }
}

// Open the modal with the clicked image
function openModal(imageUrl) {
    modal.style.display = 'flex';
    modalImage.src = imageUrl;
}

// Close the modal when the user clicks on the close button or outside the image
closeModal.addEventListener('click', closeModalFunction);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalFunction();
    }
});

function closeModalFunction() {
    modal.style.display = 'none';
    modalImage.src = ''; // Reset image source to avoid loading when closed
}

// Infinite Scroll Logic
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) {
        getPhotos(); // Load more photos when scrolled near bottom
    }
});
