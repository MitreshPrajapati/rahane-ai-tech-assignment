"use client";

import { useApi } from "@/hooks/useApi";
import ENDPOINTS from "@/utils/Endpoints";
import { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { request } = useApi();

  const fetchUsers = async () => {
    const res = await request({
      endpoint: ENDPOINTS.USERS,
    });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    const res = await request({
      method: "DELETE",
      endpoint: `${ENDPOINTS.USERS}/${id}`,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table className="w-full  ">
        {users.length && (
          <thead className="w-full  bg-slate-700 ">
            <th className="px-4 py-2 text-white  min-w-[150px] ">S.No</th>
            <th className="px-4 py-2 text-white  min-w-[150px] ">Email</th>
            <th className="px-4 py-2 text-white  min-w-[150px] ">Roles</th>
            <th className="px-4 py-2 text-white  min-w-[150px] ">Actions</th>
          </thead>
        )}
        <tbody className="bg-blue-50">
          {users?.map((user, idx) => {
            return (
              <tr key={user._id} className="border-b-1  my-auto">
                <td className="px-4 py-2 ">{idx + 1}</td>
                <td className="px-4 py-2 "> {user.email}</td>
                <td className="px-4 py-2 ">{user.roles?.join(", ")}</td>
                <td className="inline-flex justify-center space-x-2 my-auto text-center">
                  <MdEdit
                    size={24}
                    className="h-6 w-6 p-1 rounded bg-white text-blue-600"
                  />{" "}
                  <MdDelete
                    size={24}
                    onClick={() => deleteUser(user._id)}
                    className="h-6 w-6 p-1 rounded bg-white text-red-600"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
