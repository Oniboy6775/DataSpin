import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa";
import airtime from "../images/airtime.svg";
import data from "../images/data.png";
import cable from "../images/cable.png";
import utility from "../images/utility.png";
import historyImage from "../images/history.png";
import contacts from "../images/contacts.png";
import palmpay from "../images/palmpay.png";
import { useGlobalContext } from "../context/UserContext";
import WarningAlert from "../components/WarningAlert";
import { FaUserAlt } from "react-icons/fa";
import { Modal } from "../components/Modal";
import KYCModals from "../Modals/KYCModal";
import FundWalletDrawer from "../components/FundWalletDrawer";

const DashBoard = () => {
  const { user, isLoading, generateAccount } = useGlobalContext();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);
  const [kycModal, setKycModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Auto-open KYC modal if BVN/NIN missing
  useEffect(() => {
    if (!isLoading && !user?.nin && !user?.bvn) {
      setKycModal(true);
    }
  }, [isLoading, user?.nin, user?.bvn]);

  const copyReferralLink = async () => {
    const userName = encodeURIComponent(user.userName);
    const websiteUrl = window.location.origin;
    await window.navigator.clipboard.writeText(
      `${websiteUrl}/register/${userName}`
    );
    toast.success("Referral link copied!");
  };

  const copyAccNo = async (number) => {
    window.navigator.clipboard.writeText(number);
    toast.success("Account number copied!");
  };

  const navigation = [
    { name: "Airtime", image: airtime, link: "/profile/buyAirtime" },
    { name: "Data", image: data, link: "/profile/buyData" },
    { name: "TV", image: cable, link: "/profile" },
    { name: "Utility", image: utility, link: "/profile/electricity" },
    { name: "History", image: historyImage, link: "/profile/transactions" },
    { name: "Contacts", image: contacts, link: "/profile/contacts" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-color)] md:ml-[6rem] px-4 py-6 relative transition-all duration-300">
      {showAlert && <WarningAlert close={() => setShowAlert(false)} />}
      <FundWalletDrawer
        isOpen={isDrawerOpen}
        close={() => setIsDrawerOpen(false)}
      />

      {/* HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[var(--primary-100)] dark:bg-[var(--primary-800)] p-4 rounded-xl shadow-md mb-6">
        <div>
          <h2 className="text-xl font-bold capitalize">{user?.userName}</h2>
          <p className="text-sm font-semibold opacity-70">
            Balance: ₦{user?.balance?.toFixed(2) || "0.00"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            Fund Wallet
          </button>
          {!user?.bvn && !user?.nin && (
            <button
              onClick={() => setKycModal(true)}
              className="btn btn-danger px-4 py-2 text-sm"
            >
              Update KYC
            </button>
          )}
        </div>
      </header>

      {/* KYC MODAL */}
      {kycModal && <KYCModals close={() => setKycModal(false)} />}

      {/* NAVIGATION GRID */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {navigation.map((e, index) => (
          <div
            key={index}
            onClick={() => navigate(e.link)}
            className="cursor-pointer border border-[var(--primary-300)] bg-[var(--bg-secondary)] hover:bg-[var(--primary-50)] dark:hover:bg-[var(--primary-700)] rounded-2xl shadow-sm p-4 flex flex-col items-center justify-center text-center transition-all duration-200"
          >
            <img
              src={e.image}
              alt={e.name}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="font-semibold capitalize">{e.name}</p>
            {e.msg && <p className="text-red-500 text-sm">{e.msg}</p>}
          </div>
        ))}

        {!isLoading &&
          !user?.accountNumbers?.find((e) => e.bankName === "palmpay") && (
            <div
              onClick={() => generateAccount("palmpay")}
              className="cursor-pointer border border-[var(--primary-400)] bg-white dark:bg-[var(--primary-800)] rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:bg-[var(--primary-50)] transition-all"
            >
              <img
                src={palmpay}
                alt="Palmpay"
                className="w-14 h-14 object-contain mb-2"
              />
              <p className="font-semibold text-center capitalize">
                Get Palmpay Acc
              </p>
            </div>
          )}
      </section>

      {/* REFERRAL CARD */}
      <section className="max-w-lg mx-auto bg-[var(--primary-600)] text-white rounded-2xl shadow-lg p-6 text-center">
        <h2 className="text-lg font-bold mb-2">Refer a Friend 💸</h2>
        <p className="text-sm mb-4">
          Invite your friends to join DataSpin and earn ₦500 when they upgrade
          their account to Reseller.
        </p>

        <button
          className="btn btn-outline bg-white text-[var(--primary-700)] hover:text-white hover:bg-[var(--primary-700)]"
          onClick={copyReferralLink}
        >
          Copy Referral Link
        </button>

        {user.userType === "smart earner" && (
          <div className="mt-4">
            <p className="text-sm">Upgrade your account</p>
            <button
              className="btn btn-hipster mt-2 bg-[var(--primary-700)] hover:bg-[var(--primary-800)] text-white px-4 py-2"
              onClick={() => setShowAlert(true)}
            >
              Upgrade to Reseller @ ₦1000
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashBoard;
