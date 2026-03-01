import useUser from "./useUser";

const useIsAllowed = () => {
    const { user } = useUser();
    const isAllowed = (permission: string) => user?.permissions?.includes(permission);

    return isAllowed;
}

export default useIsAllowed;