import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        posts: ({ id }) => prisma.user({ id }).posts(),
        following: ({ id }) => prisma.user({ id}).following(),
        followers: ({ id }) => prisma.user({ id }).followers(),
        likes: ({ id }) => prisma.user({ id }).likes(),
        comments: ({ id }) => prisma.user({ id }).comments(),
        rooms: ({ id }) => prisma.user({ id }).rooms(),
        postsCount: ({ id }) =>
            prisma
                .postsConnection({ where: { user: { id } } })
                .aggregate()
                .count(),
        followingCount: ({ id }) =>
            prisma
                .usersConnection({ where: { followers_some: { id } } })
                .aggregate()
                .count(),
        followersCount: ({ id }) =>
            prisma
                .usersConnection({ where: { following_none: { id } } })
                .aggregate()
                .count(),
        fullName: parent => `${parent.firstName} ${parent.lastName}`,
        isFollowing: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent; // parentId에 id 값을 넣어줌
            try {
                return prisma.$exists.user({
                    AND: [
                        {
                            id: user.id
                        },
                        {
                            following_some: {
                                id: parentId
                            }
                        }
                    ]
                });
            } catch {
                return false;
            }
        },
        // 나의 프로필 확인
        isSelf: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    }
};