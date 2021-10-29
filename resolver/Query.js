const Query = {
    posts(parent, args, {db}, info) {
        // queryを書いた時に引数が「ない」時は模擬データベースの内容を全て表示
        if (!args.query) {
            return db.posts
        }
        // queryを書いた時に引数が「ある：時は引数とtitle or authorが一致したものだけ表示
        else {
            return db.posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isAuthorMatch = post.author.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isAuthorMatch
            })

        }
    },
    users: async (parent, args, {prisma}, info) => {
        try {
            return prisma.users()
        } catch (error) {
            throw error
        }
    }
}
module.exports = Query