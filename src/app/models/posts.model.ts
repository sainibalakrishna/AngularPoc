export interface State {
    postsData: any,
    loading: boolean,
    postCreated: boolean,
    PostDetails: any
}

export interface IPosts {
    id?: number,
    title: string,
    body: string,
    userId: number
}