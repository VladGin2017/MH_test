import { Tag } from "../../tags/types/tag"

export type DetailPostType = {
    id: 0,
    title: string,
    code: string,
    text: string,
    previewPicture: {
        id: 0,
        name: string,
        url: string
    },
    author: {
        id: 0,
        fullName: string,
        avatar: {}
    },
    tags: Tag[],
    updatedAt: "2019-08-24T14:15:22Z",
    createdAt: "2019-08-24T14:15:22Z"
}