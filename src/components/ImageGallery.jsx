import React from 'react';

const ImageGallery = (props) => {
const images = [
    {
        id: 1,
        url: 'https://picsum.photos/seed/nature/800/600',
        title: 'Nature',
        description: 'Beautiful natural landscape'
    },
    {
        id: 2,
        url: 'https://picsum.photos/seed/city/800/600',
        title: 'City',
        description: 'Urban architecture and cityscapes'
    },
    {
        id: 3,
        url: 'https://picsum.photos/seed/tech/800/600',
        title: 'Technology',
        description: 'Modern tech innovations'
    },
    {
        id: 4,
        url: 'https://picsum.photos/seed/food/800/600',
        title: 'Food',
        description: 'Delicious culinary creations'
    },
    {
        id: 5,
        url: 'https://picsum.photos/seed/travel/800/600',
        title: 'Travel',
        description: 'Explore the world destinations'
    },
];

// Combine default images with any provided from props
const displayImages = props.images 
    ? [...images, ...props.images.filter(img => !images.some(defaultImg => defaultImg.id === img.id))]
    : images;
    
return (
    <div className="container mx-auto p-4">
        <h2 className={`text-3xl font-bold  text-center mb-8`}>{props.title || "Mes images"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayImages.map((image) => (
                <div key={image.id} className="card bg-base-100 shadow-xl">
                    <figure>
                        <img 
                            src={image.url} 
                            alt={image.title} 
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                    </figure>
                    <div className="card-body">
                        <h3 className="card-title">{image.title}</h3>
                        <p>{image.description}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default ImageGallery;
