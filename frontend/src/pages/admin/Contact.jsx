import React, { useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import { Search, Pen } from "lucide-react";
import EditModal from "../../components/admin/Edit/EditModalContact";

export const Contact = () => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/contact/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  const handleOpenEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditModal(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="flex flex-col w-screen bg-red-500">
      <Navbar />
      <section className="relative w-full max-w-full overflow-hidden text-text pt-16 md:pt-0">
        <div className="bg-secondary relative shadow-md overflow-hidden lg:ml-44">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-2 p-4 bg-primary">
            <div
              onClick={() => handleOpenEditModal(contact)}
              className="flex items-center w-fit p-3 bg-blue-700 text-white-50 rounded-xl justify-center cursor-pointer"
            >
              <Pen width={15} className="mr-2" />
              Edit
            </div>

            <div className="w-full md:w-1/2"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-text table-fixed">
              <thead className="text-xs uppercase bg-primary text-white-50">
                <tr>
                  <th className="px-2 py-1">Platform</th>
                  <th className="px-2 py-1">Link</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  contact && (
                    <>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">TikTok</td>
                        <td className="px-2 py-1 truncate">{contact.tiktok}</td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Instagram</td>
                        <td className="px-2 py-1 truncate">
                          {contact.instagram}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Facebook</td>
                        <td className="px-2 py-1 truncate">
                          {contact.facebook}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">YouTube</td>
                        <td className="px-2 py-1 truncate">
                          {contact.youtube}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Twitter</td>
                        <td className="px-2 py-1 truncate">
                          {contact.twitter}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">LinkedIn</td>
                        <td className="px-2 py-1 truncate">
                          {contact.linkedln}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Admin 1</td>
                        <td className="px-2 py-1 truncate">
                          {contact.admin_one}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Admin 2</td>
                        <td className="px-2 py-1 truncate">
                          {contact.admin_two}
                        </td>
                      </tr>
                      <tr className="border-b border-black">
                        <td className="px-2 py-1 truncate">Email</td>
                        <td className="px-2 py-1 truncate">{contact.email}</td>
                      </tr>
                    </>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {/* Modal */}
      <EditModal
        isOpen={isEditModal}
        onClose={handleCloseEditModal}
        contactData={selectedContact}
      />
    </div>
  );
};
