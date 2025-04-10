// components/UserProfile.js
import React from "react";

const UserProfile = ({ userDetails }) => {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    let initials = "";

    if (parts.length >= 1 && parts[0]) {
      initials += parts[0].charAt(0).toUpperCase();
    }
    if (parts.length >= 2 && parts[1]) {
      initials += parts[1].charAt(0).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 1) {
      initials += parts[0].charAt(1).toUpperCase();
    }

    return initials.substring(0, 2);
  };

  if (!userDetails) {
    return <div className="p-4">No user selected.</div>;
  }

  return (
    <div className="bg-white w-80 border-l border-gray-200 p-4">
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center font-semibold text-white uppercase bg-gray-300 mb-2">
          {userDetails.avatar ? (
            <img
              src={userDetails.avatar}
              alt={userDetails.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span>{getInitials(userDetails.name)}</span>
          )}
        </div>
        <h2 className="text-lg font-semibold">{userDetails.name}</h2>
        <p className="text-sm text-gray-500">{userDetails.status}</p>
        <div className="flex space-x-2 mt-2">
          <button className="bg-blue-500 text-white rounded-md px-3 py-1 text-sm">
            Call
          </button>
          <button className="border border-gray-300 rounded-md px-3 py-1 text-sm">
            Profile
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Customer details</h3>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-gray-600">Email:</span> {userDetails.email}
          </p>
          <p className="text-sm">
            <span className="text-gray-600">First Name:</span>{" "}
            {userDetails.firstName}
          </p>
          <p className="text-sm">
            <span className="text-gray-600">Last Name:</span>{" "}
            {userDetails.lastName}
          </p>
          <button className="text-blue-500 text-sm mt-2">
            View more details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
