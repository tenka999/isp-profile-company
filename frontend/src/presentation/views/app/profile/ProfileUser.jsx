import { useSecureLS } from "@/hooks/useSecureLS";
import { useProfileApi } from "@/presentation/logics/app/profile";

import { useQuery } from "@tanstack/react-query";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
const ProfileUser = () => {
  const { getItem } = useSecureLS();
  const user = getItem("user");
  console.log("user", user.id);
  const {allProfiles,profile} = useProfileApi(user);
  allProfiles.refetch();
  profile.refetch();
  console.log("allProfiles", allProfiles.data);
  console.log("profile", profile);
  // const profile = useQuery({
  //   queryKey: ["profile"],
  //   queryFn: () => profileApi.findOne({ id: user.id }),
  //   enabled: !!user.id,
  // });

  //  const allProfiles = useQuery({
  //    queryKey: ["profiles"],
  //    queryFn: profileApi.findAll,
  //    enabled: !!user.id, // only fetch if user exists
  //  });

  function handleClick() {
  }

   console.log("allProfiles", allProfiles.data);

  return (
    <div className="flex flex-wrap grid-rows-3">
      {profile.isLoading && <div>Loading...</div>}
      {profile.isError && <div>Error</div>}
      {profile.isSuccess && (
        <>
          <div className="col-8">
            <Card className="">
              <div className="w-full flex align-items-center gap-3">
                <Avatar
                  label={profile.data.user.name.charAt(0)}
                  size="xlarge"
                  shape="circle"
                  className="flex-shrink-0"
                />
                <div className="flex flex-column w-full">
                  <div className="flex w-full">
                    <h5>{profile.data.user.name}</h5>
                    <Button
                      icon="pi pi-pencil"
                      label="Edit Profile"
                      className="p-button-rounded p-button-text ml-auto"
                    />
                  </div>
                  <p className="text-sm -mt-3 text-gray-400">
                    {profile.data.user.role}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-4 ">
            <Card></Card>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUser;
