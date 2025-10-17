import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import ProfileHeader from "../components/ProfileHeader";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/UserContext";
import { Modal } from "../components/Modal";

function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const {
    getNotification,
    notification,
    isNotificationCheck,
    clearNotification,
  } = useGlobalContext();

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--primary-100)] dark:bg-[var(--primary-900)] transition-colors duration-300">
      {/* ✅ Notification Modal */}
      {!isNotificationCheck && notification && (
        <Modal
          title="Notifications"
          children={notification}
          buttons={[
            {
              name: "OK",
              handleClick: clearNotification,
              className: "btn-danger",
            },
          ]}
        />
      )}

      {/* ✅ Header */}
      <ProfileHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* ✅ Main Layout */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`transition-all duration-300 ease-in-out ${
            isMenuOpen ? "w-64" : "w-0"
          } hidden md:block bg-[var(--primary-200)] dark:bg-[var(--primary-800)] shadow-lg overflow-y-auto`}
        >
          <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </aside>

        {/* ✅ Content Area */}
        <main className="flex-1 mt-[4rem] md:mt-0 overflow-y-auto p-4 md:p-6 rounded-t-2xl bg-white dark:bg-[var(--primary-950)] shadow-inner">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Profile;
