import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchUsers } from "./redux/slice";

export default function Form() {
  const dispatch = useDispatch();
  const {
    register: registerData,
    isLoading,
    error,
  } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    // console.log("Updated registrationData:", registerData);
    dispatch(fetchUsers());
    // if (registerData.length >= 0) {
    //   console.log("Registration data has users.");
    // } else {
    //   console.log("No registration data found.");
    // }
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registerUser(data));

    reset();
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        {/* Display error or loading state */}
        {isLoading && <p>Loading users...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Display list of fetched users */}
        <ul className="mb-4">
          {registerData.map((user, index) => (
            <li key={index} className="text-sm bg-gray-400 m-2">
              Name:-{user.name.firstname} {user.name.lastname}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 w-[400px] rounded-sm bg-slate-400 px-8 py-6">
            <h1 className="text-center text-[28px]">Registration</h1>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                {...register("name", { required: "Name is required" })}
                className="p-2 rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <label htmlFor="">Choose Role</label>

            <select
              {...register("role", { required: "Role is required" })}
              className="p-2 rounded-md"
            >
              Choose role
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="">Password</label>
              <input
                type="text"
                placeholder="Enter Password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="p-2 rounded-md"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
