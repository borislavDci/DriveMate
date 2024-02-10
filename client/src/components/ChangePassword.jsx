import { useOutletContext } from "react-router-dom";

const ChangePassword = () => {
  const { user, revalidate } = useOutletContext();

  return (
    <>
      <div className="flex gap-5">
        <form className="flex gap-5 my-5 flex-col justify-center items-center bg-blue-300 p-5 rounded-lg">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="currentPassword" className="font-bold">
                Current password
              </label>
              <input
                className="border border-blue-500 rounded-sm pl-5 py-2"
                type="password"
                name="currentPassword"
                id="currentPassword"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="newPassword" className="font-bold">
                New password
              </label>
              <input
                className="border border-blue-500 rounded-sm pl-5 py-2"
                type="password"
                name="newPassword"
                id="newPassword"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="repeatPassword" className="font-bold">
                Repeat new password
              </label>
              <input
                className="border border-blue-500 rounded-sm pl-5 py-2"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
              />
            </div>
          </div>
          <input
            className="bg-blue-600 p-4 rounded-lg text-white hover:bg-blue-500 hover:cursor-pointer"
            type="submit"
            value="Change password"
          />
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
