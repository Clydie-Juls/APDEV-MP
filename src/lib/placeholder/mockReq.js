import { Comments } from './comments';
import { Posts } from './posts';
import { Users } from './users';

export const TempUsers = {
    getInfoFromId(id) {
        return Users.find(u => u.id === id);
    },

    getPostsFromId(id) {
        return Posts.filter(p => p.posterId === id);
    },

    getCommentsFromId(id) {
        return Comments.filter(c => c.commenterId === id);
    }
};

export const TempPosts = {
    getFromId(id) {
        return Posts.find(p => p.id === id);
    }
};