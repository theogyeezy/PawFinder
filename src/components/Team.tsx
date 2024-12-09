import React from 'react';

const founder = {
  name: 'Matthew Yee',
  role: 'Founder',
  image: 'https://i.ibb.co/G7fysJ6/Chili.jpg',
  bio: 'Serial entrepreneur and proud owner of 2 huskies, 1 malamute, and a German shepherd. When not working on PawFinder, Matthew serves as a major league baseball coach and bullpen catcher.',
};

export function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our founder</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Combining his passion for pets and technology to create innovative solutions for pet safety.
          </p>
        </div>
        <div className="mx-auto mt-20 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                className="aspect-[4/4] w-full rounded-2xl object-cover shadow-lg" 
                src={founder.image} 
                alt={founder.name} 
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mb-2">
                {founder.name}
              </h3>
              <p className="text-lg leading-7 text-blue-600 mb-4">{founder.role}</p>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  As a dedicated pet owner and tech enthusiast, Matthew understands firsthand the importance of keeping our furry friends safe and secure.
                </p>
                <p className="mb-4">
                  {founder.bio}
                </p>
                <p>
                  His unique combination of entrepreneurial experience and deep love for animals drives PawFinder's mission to revolutionize pet safety through innovative technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}