export interface IUser {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    profile: {
        bio: string,
        summary: string,
        first: string,
        middle: string,
        last: string,
    };
    createdAt: string;
    updatedAt: string;
}
