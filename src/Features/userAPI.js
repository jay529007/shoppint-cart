export const getUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

export const addUser = async (userData) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const updateUser = async (id, updatedData) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
};
