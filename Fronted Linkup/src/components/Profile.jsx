import React from 'react';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend Developer | React Enthusiast | Open Source Contributor',
    location: 'San Francisco, CA',
    joinDate: 'Joined January 2023',
    following: 342,
    followers: 1287,
    posts: 56,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    coverImage: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cover Photo */}
      <div className="relative h-48 bg-blue-500 overflow-hidden">
        <img 
          src={user.coverImage} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-6">
          <div className="flex items-end">
            <img
              className="h-32 w-32 rounded-full border-4 border-white bg-white"
              src={user.avatar}
              alt={user.name}
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Bio and Stats */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">About</h2>
            <p className="text-gray-600 mt-2">{user.bio}</p>
          </div>

          <div className="flex items-center text-gray-600 mb-4">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{user.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{user.joinDate}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Posts</h3>
            <p className="text-3xl font-bold text-blue-600">{user.posts}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Followers</h3>
            <p className="text-3xl font-bold text-blue-600">{user.followers}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Following</h3>
            <p className="text-3xl font-bold text-blue-600">{user.following}</p>
          </div>
        </div>

        {/* Additional Content */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-gray-600">Posted a new project</p>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-gray-600">Liked a post</p>
              <p className="text-sm text-gray-400">5 hours ago</p>
            </div>
            <div>
              <p className="text-gray-600">Followed a new user</p>
              <p className="text-sm text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;