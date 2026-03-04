import useUser from "./useUser";

const useIsAllowed = (): (permission: string) => boolean => {
    const { user } = useUser();

    const isAllowed = (permission: string): boolean => user?.permissions?.includes(permission) ?? false;

    return isAllowed;
}

export default useIsAllowed;