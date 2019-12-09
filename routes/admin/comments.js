const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', async (req, res) => {
    const getComments = await Comment.find({ user: req.user.id }).populate('user');
    res.render('admin/comments', { getComments });
});


router.post('/', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.body.id });
        const newComment = await new Comment({
            user: req.user.id,
            body: req.body.body
        });
        await post.comments.push(newComment);
        await post.save();
        await newComment.save();
        req.flash('success_message', 'Yorumunuz kısa süren bir değerlendirmenin ardından gösterilecektir');
        res.redirect(`/post-detail/${post.slug}`);
    } catch (error) {
        console.log('Error: ', error);
    }
});


router.get('/delete/:id', async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id });
        comment.remove();
        const post = await Post.findOneAndUpdate({ comments: req.params.id }, { $pull: { comments: req.params.id } });
        req.flash('success_message', 'Yorumunuz başarıyla silindi!');
        res.redirect('/admin/comments');
    } catch (error) {
        console.log('Error occured: ', error);
    }
});


router.post('/approve-comments', async (req, res) => {
    try {
        const data = await Comment.findByIdAndUpdate(req.body.id, { $set: { approveComment: req.body.approveComment } }, { useFindAndModify: false });
        res.send(data);
    } catch (error) {
        console.log('Error occured: ', error);
    }

})



module.exports = router;